using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using cloud.Models;
using cloud.Models.Requests;
using Ydb.Sdk.Services.Table;
using Ydb.Sdk.Value;

namespace cloud.DB
{
    public class YDB
    {
        private TableClient client;

        public YDB(TableClient client)
        {
            this.client = client;
        }

        public async Task<Jokes[]> GetAll()
        {
            var response = await client.SessionExec(async session =>
            {
                var query = @"SELECT id, userName , joke, mark FROM jokes";

                return await session.ExecuteDataQuery(
                    query,
                    parameters: new Dictionary<string, YdbValue>(),
                    txControl: TxControl.BeginSerializableRW().Commit()
                );
            });

            response.Status.EnsureSuccess();
            var queryResponse = (ExecuteDataQueryResponse)response;
            return queryResponse.Result.ResultSets[0].Rows.Select(row => new Jokes
            {
                id = (ulong?)row["id"],
                userName = (string?)row["userName"],
                joke = (string?)row["joke"],
                mark = (int?)row["mark"]
            }).ToArray();
        }

        public async Task<Jokes> Create(CreateJokes createGuestRequest)
        {
            var newId = (await GetAll()).Max(g => g.id).Value + 1;

            var response = await client.SessionExec(async session =>
            {
                var query = @"
DECLARE $id AS Uint64;
DECLARE $joke AS Utf8;
DECLARE $mark AS Int32;
DECLARE $userName AS Utf8;

INSERT INTO jokes (id, joke, mark, userName) VALUES ($id, $joke, $mark, $userName)";

                return await session.ExecuteDataQuery(
                    query,
                    parameters: new Dictionary<string, YdbValue>()
                    {
                        { "$id", YdbValue.MakeUint64(newId) },
                        { "$userName", YdbValue.MakeUtf8(createGuestRequest.Name) },
                        { "$joke", YdbValue.MakeUtf8(createGuestRequest.Joke) },
                        { "$mark", YdbValue.MakeInt32(createGuestRequest.Mark) }
                    },
                    txControl: TxControl.BeginSerializableRW().Commit()
                );
            });

            response.Status.EnsureSuccess();

            return new Jokes()
            {
                id = newId,
                userName = createGuestRequest.Name,
                joke = createGuestRequest.Joke,
                mark = createGuestRequest.Mark
            };
        }
    }
}