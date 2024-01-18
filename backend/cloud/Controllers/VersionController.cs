using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace cloud.Controllers
{
    [Route("api/info")]
    public class VersionController : ControllerBase
    {
        [HttpGet("version")]
        public async Task<ActionResult<string>> GetVersionAsync()
        {
            var version = await System.IO.File.ReadAllTextAsync(@".version");
            return version;
        }
    
        [HttpGet("host")]
        public async Task<ActionResult<string>> GetHostAsync()
        {
            var hostName = Dns.GetHostName();
            return hostName;
        }
    }
}