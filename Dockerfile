# Use Eclipse Temurin OpenJDK 17 as base image
FROM eclipse-temurin:21

# Create app directory
WORKDIR /app

# Copy jar file from build context
COPY target/spring-first-project-0.0.1-SNAPSHOT.jar app.jar

# Expose the port that Spring Boot listens on
EXPOSE 8080

# Run the jar file
ENTRYPOINT ["java", "-jar", "app.jar"]