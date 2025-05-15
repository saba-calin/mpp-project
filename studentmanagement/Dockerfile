FROM eclipse-temurin:23-jdk
WORKDIR /app
COPY target/*.jar app.jar
COPY photos /app/photos
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
