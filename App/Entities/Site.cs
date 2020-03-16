using System;
using System.Collections.Generic;
using Common;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace Portal.BE.Entities
{
    public class Site : DataEntity,  IEquatable<Site>
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string URL { get; set; }
        public long Status { get; set; }

        public bool Equals(Site other)
        {
            return other != null && Id == other.Id;
        }
        public override int GetHashCode()
        {
            return Id.GetHashCode();
        }
    }

    public class SiteFilter : FilterEntity
    {
        public IdFilter Id { get; set; }
        public StringFilter Name { get; set; }
        public StringFilter URL { get; set; }
        public LongFilter Status { get; set; }
        public List<SiteFilter> OrFilter { get; set; }
        public SiteOrder OrderBy {get; set;}
        public SiteSelect Selects {get; set;}
    }

    [JsonConverter(typeof(StringEnumConverter))]
    public enum SiteOrder
    {
        Id = 0,
        Name = 1,
        URL = 2,
        Status = 3,
    }

    [Flags]
    public enum SiteSelect:long
    {
        ALL = E.ALL,
        Id = E._0,
        Name = E._1,
        URL = E._2,
        Status = E._3,
    }
}
