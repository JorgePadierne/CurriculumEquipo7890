using Lista_Tareas.Context;
using Microsoft.EntityFrameworkCore;
using Npgsql;

var builder = WebApplication.CreateBuilder(args);

// Intentar obtener la cadena de conexión completa primero
var connectionString = Environment.GetEnvironmentVariable("DATABASE_URL") ?? 
                      Environment.GetEnvironmentVariable("DB_CONNECTION_STRING");

// Si no hay cadena completa, construir desde variables individuales
if (string.IsNullOrEmpty(connectionString))
{
    var host = Environment.GetEnvironmentVariable("DB_HOST");
    var port = Environment.GetEnvironmentVariable("DB_PORT") ?? "5432";
    var user = Environment.GetEnvironmentVariable("DB_USER");
    var password = Environment.GetEnvironmentVariable("DB_PASSWORD");
    var database = Environment.GetEnvironmentVariable("DB_NAME");
    var sslmode = Environment.GetEnvironmentVariable("DB_SSLMODE") ?? "Require";

    connectionString = new NpgsqlConnectionStringBuilder
    {
        Host = host,
        Port = int.Parse(port),
        Username = user,
        Password = password,
        Database = database,
        SslMode = Enum.Parse<SslMode>(sslmode),
        TrustServerCertificate = true
    }.ConnectionString;
}
else
{
    // Si la cadena viene en formato postgres://, convertirla al formato correcto
    if (connectionString.StartsWith("postgres://"))
    {
        connectionString = connectionString.Replace("postgres://", "");
        
        // Parsear la cadena de conexión postgres://
        var uri = new Uri($"postgres://{connectionString}");
        var builder = new NpgsqlConnectionStringBuilder
        {
            Host = uri.Host,
            Port = uri.Port,
            Username = uri.UserInfo.Split(':')[0],
            Password = uri.UserInfo.Split(':')[1],
            Database = uri.AbsolutePath.TrimStart('/'),
            SslMode = SslMode.Require,
            TrustServerCertificate = true
        };
        connectionString = builder.ConnectionString;
    }
}

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




