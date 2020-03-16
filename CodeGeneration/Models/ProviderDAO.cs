﻿using System;
using System.Collections.Generic;

namespace CodeGeneration.Models
{
    public partial class ProviderDAO
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
    }
}
