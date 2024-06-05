#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClientSecure.h>
#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>

// Replace with your network credentials
const char* ssid = "TEST";
const char* password = "12345678";

#define DHTPIN D2
#define DHTTYPE DHT11

DHT_Unified dht(DHTPIN, DHTTYPE);

String generateToken();
bool authorized = false;
const String token = generateToken();
const String sensor_name = "Temperature And Humidity sensor #1";
const String serverName = "https://api.kantanudarznieciba.lv/api/v1/sensor/handshake";
const String dataServerName = "https://api.kantanudarznieciba.lv/api/v1/sensor/data";

// Timing variables
unsigned long previousConnectionMillis = 0;
unsigned long previousDataMillis = 0;
const long connectionInterval = 5000; // 5 seconds interval
const long dataInterval = 30000; // 30 seconds interval

void setup() {
  Serial.begin(115200);
  delay(10);

  dht.begin();

  Serial.println("Connecting to WiFi...");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }
  Serial.println("\nConnected to WiFi");
}

void loop() {
  unsigned long currentMillis = millis();

  if (!authorized && currentMillis - previousConnectionMillis >= connectionInterval) {
    previousConnectionMillis = currentMillis;
    connectionAttempt();
  } else if (authorized && currentMillis - previousDataMillis >= dataInterval) {
    previousDataMillis = currentMillis;
    sendData();
  }
}

void connectionAttempt() {
  if (WiFi.status() == WL_CONNECTED) {
    WiFiClientSecure client;
    HTTPClient http;

    client.setInsecure();  // Disable SSL certificate verification
    http.setFollowRedirects(HTTPC_FORCE_FOLLOW_REDIRECTS);
    http.begin(client, serverName);

    String formData = "sensor_name=" + sensor_name + "&sensor_token=" + token;

    http.addHeader("Content-Type", "application/x-www-form-urlencoded");

    int httpCode = http.POST(formData);

    if (httpCode > 0) {
      Serial.printf("[HTTP] POST request status code: %d\n", httpCode);
      String response = http.getString();
      Serial.println("Response: " + response);

      if (httpCode == 200) {
        authorized = true;
        Serial.println("Sensor authorized");
      } else {
        Serial.println("Sensor not authorized");
      }
    } else {
      Serial.printf("[HTTP] POST request failed, error: %s\n", http.errorToString(httpCode).c_str());
    }

    http.end();
  } else {
    Serial.println("WiFi not connected");
  }
}

void sendData() {
  if (WiFi.status() == WL_CONNECTED) {
    WiFiClientSecure client;
    HTTPClient http;

    client.setInsecure();  // Disable SSL certificate verification
    http.begin(client, dataServerName);

    sensors_event_t temperatureEvent, humidityEvent;
    dht.temperature().getEvent(&temperatureEvent);
    dht.humidity().getEvent(&humidityEvent);

    float temperature = temperatureEvent.temperature;
    float humidity = humidityEvent.relative_humidity;

    // Check if any reads failed and exit early (to try again).
    if (isnan(temperature)) {
      Serial.println("Failed to read temperature from DHT sensor!");
    } else {
      Serial.printf("Temperature: %.2f°C\n", temperature);
    }

    if (isnan(humidity)) {
      Serial.println("Failed to read humidity from DHT sensor!");
    } else {
      Serial.printf("Humidity: %.2f%%\n", humidity);
    }

    if (isnan(temperature) || isnan(humidity)) {
      return;
    }

    String formData = "sensor_token=" + token + "&temperature=" + String(temperature) + "&humidity=" + String(humidity);

    http.addHeader("Content-Type", "application/x-www-form-urlencoded");

    int httpCode = http.POST(formData);

    if (httpCode > 0) {
      Serial.printf("[HTTP] POST request status code: %d\n", httpCode);
      String response = http.getString();
      Serial.println("Response: " + response);
    } else {
      Serial.printf("[HTTP] POST request failed, error: %s\n", http.errorToString(httpCode).c_str());
    }

    http.end();
  } else {
    Serial.println("WiFi not connected");
  }
}

String generateToken() {
  const char charset[] = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const int tokenLength = 30;
  String token = "";

  for (int i = 0; i < tokenLength; i++) {
    int index = random(strlen(charset));
    token += charset[index];
  }

  return token;
}
