using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskSharpHTTP.Models
{
    [Table("CHART")]
    public class CuentaItem
    {
        [Key][JsonProperty("id")][Column("ID")]
        public int ID { get; set; }
        [JsonProperty("codigo")][Column("ACCNO")]
        public string Codigo { get; set; }
         [JsonProperty("descripcion")][Column("DESCRIPTION")]
        public string Descripcion { get; set; }
         [JsonProperty("char")][Column("CHARTTYPE")]
        public string Char { get; set; }
         [JsonProperty("categoria")][Column("CATEGORY")]
        public string Categoria { get; set; }
        [JsonProperty("link")][Column("LINK")]
        public string Link { get; set; }
        [JsonProperty("gifi")][Column("GIFI_ACCNO")]
        public string Gifi { get; set; }
        
    }
}