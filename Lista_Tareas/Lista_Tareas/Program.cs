using Lista_Tareas.Context;
using Microsoft.EntityFrameworkCore;
using Npgsql;

var builder = WebApplication.CreateBuilder(args);

// -----------------------------
// 1️⃣ Leer DATABASE_URL
// -----------------------------
string? databaseUrl = Environment.GetEnvironmentVariable("DATABASE_URL");

string connectionString;

if (!string.IsNullOrEmpty(databaseUrl))
{
    var databaseUri = new Uri(databaseUrl);
    var userInfo = databaseUri.UserInfo.Split(':');

    var port = databaseUri.Port != -1 ? databaseUri.Port : 5432;

    var npgsqlBuilder = new NpgsqlConnectionStringBuilder
    {
        Host = databaseUri.Host,
        Port = port,
        Username = userInfo[0],
        Password = userInfo[1],
        Database = databaseUri.AbsolutePath.TrimStart('/'),
        SslMode = SslMode.Require
    };

    connectionString = npgsqlBuilder.ConnectionString;
}
else
{
    connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
}

// -----------------------------
// 2️⃣ Configurar DbContext
// -----------------------------
builder.Services.AddDbContext<ToDoListContext>(options =>
    options.UseNpgsql(connectionString)
           .LogTo(Console.WriteLine));

// -----------------------------
// 3️⃣ Configurar servicios y CORS
// -----------------------------
builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirReact",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});
builder.Services.AddOpenApi();

var app = builder.Build();

// -----------------------------
// 4️⃣ Middleware
// -----------------------------
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors("PermitirReact");
app.UseAuthorization();
app.MapControllers();
app.Run();

