# Stage 1: Build the Spring Boot app
FROM eclipse-temurin:21 AS builder

WORKDIR /app

# Copy source code
COPY . .
# ✅ Make mvnw executable
RUN chmod +x ./mvnw

# ✅ Build the JAR inside Docker
RUN ./mvnw clean package -DskipTests

# Build the JAR inside the container
RUN ./mvnw clean package -DskipTests

# Stage 2: Run the app
FROM eclipse-temurin:21

WORKDIR /app

# Copy the built jar from builder stage
COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]