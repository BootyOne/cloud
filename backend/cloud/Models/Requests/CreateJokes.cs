using System;
using System.ComponentModel.DataAnnotations;

namespace cloud.Models.Requests
{
    public class CreateJokes
    {
        [Required]
        public string Name { get; set; }
    
        [Required]
        public string Joke { get; set; }
        
        [Required]
        public Int32 Mark { get; set; }
    }
}