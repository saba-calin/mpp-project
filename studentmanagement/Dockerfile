FROM eclipse-temurin:23-jdk
WORKDIR /app
COPY target/*.jar app.jar
RUN MKDIR -p /app/photos
COPY photos/default-photo.jpg /app/photos/default-photo.jpg
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
