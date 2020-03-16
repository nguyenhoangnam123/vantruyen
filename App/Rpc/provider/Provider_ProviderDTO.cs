using Common;
using System;
using System.Linq;
using System.Collections.Generic;
using Portal.BE.Entities;

namespace Portal.BE.Rpc.provider
{
    public class Provider_ProviderDTO : DataDTO
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
        public Provider_ProviderDTO() {}
        public Provider_ProviderDTO(Provider Provider)
        {
            this.Id = Provider.Id;
            this.Name = Provider.Name;
            this.GoogleRedirectUri = Provider.GoogleRedirectUri;
            this.ADIP = Provider.ADIP;
            this.ADUsername = Provider.ADUsername;
            this.ADPassword = Provider.ADPassword;
            this.GoogleClient = Provider.GoogleClient;
            this.GoogleClientSecret = Provider.GoogleClientSecret;
            this.MicrosoftClient = Provider.MicrosoftClient;
            this.MicrosoftClientSecret = Provider.MicrosoftClientSecret;
            this.MicrosoftRedirectUri = Provider.MicrosoftRedirectUri;
        }
    }

    public class Provider_ProviderFilterDTO : FilterDTO
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
        public ProviderOrder OrderBy { get; set; }
    }
}
