FROM eclipse-temurin:23-jdk
WORKDIR /app
COPY target/*.jar app.jar
COPY photos /app/default-photos
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
