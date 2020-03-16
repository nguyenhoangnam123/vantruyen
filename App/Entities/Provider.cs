using System;
using System.Collections.Generic;
using Common;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace Portal.BE.Entities
{
    public class Provider : DataEntity,  IEquatable<Provider>
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string GoogleRedirectUri { get; set; }
        public string ADIP { get; set; }
        public string ADUsername { get; set; }
        public string ADPassword { get; set; }
        public string GoogleClient { get; set; }
        public string GoogleClientSecret { get; set; }
        public string MicrosoftClient { get; set; }
        public string MicrosoftClientSecret { get; set; }
        public string MicrosoftRedirectUri { get; set; }

        public bool Equals(Provider other)
        {
            return other != null && Id == other.Id;
        }
        public override int GetHashCode()
        {
            return Id.GetHashCode();
        }
    }

    public class ProviderFilter : FilterEntity
    {
        public IdFilter Id { get; set; }
        public StringFilter Name { get; set; }
        public StringFilter GoogleRedirectUri { get; set; }
        public StringFilter ADIP { get; set; }
        public StringFilter ADUsername { get; set; }
        public StringFilter ADPassword { get; set; }
        public StringFilter GoogleClient { get; set; }
        public StringFilter GoogleClientSecret { get; set; }
        public StringFilter MicrosoftClient { get; set; }
        public StringFilter MicrosoftClientSecret { get; set; }
        public StringFilter MicrosoftRedirectUri { get; set; }
        public List<ProviderFilter> OrFilter { get; set; }
        public ProviderOrder OrderBy {get; set;}
        public ProviderSelect Selects {get; set;}
    }

    [JsonConverter(typeof(StringEnumConverter))]
    public enum ProviderOrder
    {
        Id = 0,
        Name = 1,
        GoogleRedirectUri = 2,
        ADIP = 3,
        ADUsername = 4,
        ADPassword = 5,
        GoogleClient = 6,
        GoogleClientSecret = 7,
        MicrosoftClient = 8,
        MicrosoftClientSecret = 9,
        MicrosoftRedirectUri = 10,
    }

    [Flags]
    public enum ProviderSelect:long
    {
        ALL = E.ALL,
        Id = E._0,
        Name = E._1,
        GoogleRedirectUri = E._2,
        ADIP = E._3,
        ADUsername = E._4,
        ADPassword = E._5,
        GoogleClient = E._6,
        GoogleClientSecret = E._7,
        MicrosoftClient = E._8,
        MicrosoftClientSecret = E._9,
        MicrosoftRedirectUri = E._10,
    }
}
