using System.Threading.Tasks;
using cloud.DB;
using cloud.Models;
using cloud.Models.Requests;
using Microsoft.AspNetCore.Mvc;

namespace cloud.Controllers
{
    [Route("api/jokes")]
    public class StateController : ControllerBase
    {
        private YDB YandexDB;
        public StateController(YDB yandexDb)
        {
            this.YandexDB = yandexDb;
        }
    
        [HttpGet]
        public async Task<ActionResult<Jokes[]>> GetAsync()
        {
            return await YandexDB.GetAll();
        }

        [HttpPost("jokes")]
        public async Task<ActionResult<Jokes>> CreateGuestAsync(CreateJokes createJokeRequest)
        {
            return await YandexDB.Create(createJokeRequest);
        }
    }
}