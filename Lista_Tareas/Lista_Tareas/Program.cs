using Lista_Tareas.Context;
using Microsoft.EntityFrameworkCore;
using Npgsql;

var builder = WebApplication.CreateBuilder(args);

// ----------------------------------------------------
// 1️⃣ Leer DATABASE_URL (Internal URL en Render)
// ----------------------------------------------------
string? databaseUrl = Environment.GetEnvironmentVariable("DATABASE_URL");

string connectionString;

if (!string.IsNullOrEmpty(databaseUrl))
{
    // Convertir la URL de Render al formato Npgsql
    var databaseUri = new Uri(databaseUrl);
    var userInfo = databaseUri.UserInfo.Split(':');

    var npgsqlBuilder = new NpgsqlConnectionStringBuilder
    {
        Host = databaseUri.Host,
        Port = databaseUri.Port,
        Username = userInfo[0],
        Password = userInfo[1],
        Database = databaseUri.AbsolutePath.TrimStart('/'),
        SslMode = SslMode.Require,
        TrustServerCertificate = true
    };

    connectionString = npgsqlBuilder.ConnectionString;
}
else
{
    // Si no hay variable de entorno, usar la cadena local de appsettings.json
    connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
}

// ----------------------------------------------------
// 2️⃣ Configurar DbContext
// ----------------------------------------------------
builder.Services.AddDbContext<ToDoListContext>(options =>
    options.UseNpgsql(connectionString));

// ----------------------------------------------------
// 3️⃣ Configurar servicios y CORS
// ----------------------------------------------------
builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirReact",
        policy =>
        {
            policy.WithOrigins("https://curriculum-equipo7890.vercel.app")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});
builder.Services.AddOpenApi();

var app = builder.Build();

// ----------------------------------------------------
// 4️⃣ Middleware
// ----------------------------------------------------
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors("PermitirReact");
app.UseAuthorization();
app.MapControllers();
app.Run();

