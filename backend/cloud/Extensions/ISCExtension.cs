using cloud.DB;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Ydb.Sdk;
using Ydb.Sdk.Services.Table;
using Ydb.Sdk.Yc;

namespace cloud.Extensions
{
    public static class ISCExtension
    {
        public static IServiceCollection AddDB(this IServiceCollection services)
        {
            var saProvider = new ServiceAccountProvider(
                saFilePath: "authorized_key.json", // Path to file with service account JSON info
                loggerFactory: new LoggerFactory());

            saProvider.Initialize().GetAwaiter().GetResult();
            var config = new DriverConfig(
                endpoint: "grpcs://ydb.serverless.yandexcloud.net:2135",
                database: "/ru-central1/b1g9co27s05u4pf4ff18/etn6gk7rqgc7ja08id4k",
                credentials: saProvider
            );

            var driver = new Driver(
                config: config,
                loggerFactory: new LoggerFactory()
            );

            driver.Initialize().GetAwaiter().GetResult(); // Make sure to await driver initialization
            return services
                .AddSingleton(new TableClient(driver, new TableClientConfig()))
                .AddSingleton<YDB>();
        }
    }
}