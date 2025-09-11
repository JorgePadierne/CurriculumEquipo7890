using Lista_Tareas.Context;
using Microsoft.EntityFrameworkCore;
using Npgsql;

var builder = WebApplication.CreateBuilder(args);

// Construir la cadena de conexión desde variables individuales
var host = Environment.GetEnvironmentVariable("DB_HOST");
var port = Environment.GetEnvironmentVariable("DB_PORT") ?? "5432";
var user = Environment.GetEnvironmentVariable("DB_USER");
var password = Environment.GetEnvironmentVariable("DB_PASSWORD");
var database = Environment.GetEnvironmentVariable("DB_NAME");
var sslmode = Environment.GetEnvironmentVariable("DB_SSLMODE") ?? "Require";

// Log para diagnosticar las variables de entorno
Console.WriteLine($"DB_HOST: {host ?? "NULL"}");
Console.WriteLine($"DB_PORT: {port}");
Console.WriteLine($"DB_USER: {user ?? "NULL"}");
Console.WriteLine($"DB_PASSWORD: {(string.IsNullOrEmpty(password) ? "NULL" : "SET")}");
Console.WriteLine($"DB_NAME: {database ?? "NULL"}");
Console.WriteLine($"DB_SSLMODE: {sslmode}");

var connectionString = new NpgsqlConnectionStringBuilder
{
    Host = host,
    Port = int.Parse(port),
    Username = user,
    Password = password,
    Database = database,
    SslMode = Enum.Parse<SslMode>(sslmode),
    TrustServerCertificate = true
}.ConnectionString;

// Log de la cadena de conexión (sin password por seguridad)
var logConnectionString = connectionString.Replace($"Password={password}", "Password=***");
Console.WriteLine($"Connection String: {logConnectionString}");

builder.Services.AddDbContext<ToDoListContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirReact", policy =>
    {
        policy.WithOrigins("https://curriculum-equipo7890.vercel.app")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors("PermitirReact");
app.UseAuthorization();
app.MapControllers();
app.Run();




