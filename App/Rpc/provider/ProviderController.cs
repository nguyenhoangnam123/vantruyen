using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Common;
using Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Portal.BE.Entities;
using Portal.BE.Services.MProvider;

namespace Portal.BE.Rpc.provider
{
    public class ProviderRoute : Root
    {
        public const string Master = Module + "/provider/provider-master";
        public const string Detail = Module + "/provider/provider-detail";
        private const string Default = Rpc + Module + "/provider";
        public const string Count = Default + "/count";
        public const string List = Default + "/list";
        public const string Get = Default + "/get";
        public const string Create = Default + "/create";
        public const string Update = Default + "/update";
        public const string Delete = Default + "/delete";
        public const string Import = Default + "/import";
        public const string Export = Default + "/export";

        public static Dictionary<string, FieldType> Filters = new Dictionary<string, FieldType>
        {
            { nameof(ProviderFilter.Id), FieldType.ID },
            { nameof(ProviderFilter.Name), FieldType.STRING },
            { nameof(ProviderFilter.GoogleRedirectUri), FieldType.STRING },
            { nameof(ProviderFilter.ADIP), FieldType.STRING },
            { nameof(ProviderFilter.ADUsername), FieldType.STRING },
            { nameof(ProviderFilter.ADPassword), FieldType.STRING },
            { nameof(ProviderFilter.GoogleClient), FieldType.STRING },
            { nameof(ProviderFilter.GoogleClientSecret), FieldType.STRING },
            { nameof(ProviderFilter.MicrosoftClient), FieldType.STRING },
            { nameof(ProviderFilter.MicrosoftClientSecret), FieldType.STRING },
            { nameof(ProviderFilter.MicrosoftRedirectUri), FieldType.STRING },
        };
    }

    public class ProviderController : RpcController
    {
        private IProviderService ProviderService;

        public ProviderController(
            IProviderService ProviderService
        )
        {
            this.ProviderService = ProviderService;
        }

        [Route(ProviderRoute.Count), HttpPost]
        public async Task<ActionResult<int>> Count([FromBody] Provider_ProviderFilterDTO Provider_ProviderFilterDTO)
        {
            if (!ModelState.IsValid)
                throw new BindException(ModelState);

            ProviderFilter ProviderFilter = ConvertFilterDTOToFilterEntity(Provider_ProviderFilterDTO);
            ProviderFilter = ProviderService.ToFilter(ProviderFilter);
            int count = await ProviderService.Count(ProviderFilter);
            return count;
        }

        [Route(ProviderRoute.List), HttpPost]
        public async Task<ActionResult<List<Provider_ProviderDTO>>> List([FromBody] Provider_ProviderFilterDTO Provider_ProviderFilterDTO)
        {
            if (!ModelState.IsValid)
                throw new BindException(ModelState);

            ProviderFilter ProviderFilter = ConvertFilterDTOToFilterEntity(Provider_ProviderFilterDTO);
            ProviderFilter = ProviderService.ToFilter(ProviderFilter);
            List<Provider> Providers = await ProviderService.List(ProviderFilter);
            List<Provider_ProviderDTO> Provider_ProviderDTOs = Providers
                .Select(c => new Provider_ProviderDTO(c)).ToList();
            return Provider_ProviderDTOs;
        }

        [Route(ProviderRoute.Get), HttpPost]
        public async Task<ActionResult<Provider_ProviderDTO>> Get([FromBody]Provider_ProviderDTO Provider_ProviderDTO)
        {
            if (!ModelState.IsValid)
                throw new BindException(ModelState);

            if (!await HasPermission(Provider_ProviderDTO.Id))
                return Forbid();

            Provider Provider = await ProviderService.Get(Provider_ProviderDTO.Id);
            return new Provider_ProviderDTO(Provider);
        }

        [Route(ProviderRoute.Create), HttpPost]
        public async Task<ActionResult<Provider_ProviderDTO>> Create([FromBody] Provider_ProviderDTO Provider_ProviderDTO)
        {
            if (!ModelState.IsValid)
                throw new BindException(ModelState);
            
            if (!await HasPermission(Provider_ProviderDTO.Id))
                return Forbid();

            Provider Provider = ConvertDTOToEntity(Provider_ProviderDTO);
            Provider = await ProviderService.Create(Provider);
            Provider_ProviderDTO = new Provider_ProviderDTO(Provider);
            if (Provider.IsValidated)
                return Provider_ProviderDTO;
            else
                return BadRequest(Provider_ProviderDTO);
        }

        [Route(ProviderRoute.Update), HttpPost]
        public async Task<ActionResult<Provider_ProviderDTO>> Update([FromBody] Provider_ProviderDTO Provider_ProviderDTO)
        {
            if (!ModelState.IsValid)
                throw new BindException(ModelState);
            
            if (!await HasPermission(Provider_ProviderDTO.Id))
                return Forbid();

            Provider Provider = ConvertDTOToEntity(Provider_ProviderDTO);
            Provider = await ProviderService.Update(Provider);
            Provider_ProviderDTO = new Provider_ProviderDTO(Provider);
            if (Provider.IsValidated)
                return Provider_ProviderDTO;
            else
                return BadRequest(Provider_ProviderDTO);
        }

        [Route(ProviderRoute.Delete), HttpPost]
        public async Task<ActionResult<Provider_ProviderDTO>> Delete([FromBody] Provider_ProviderDTO Provider_ProviderDTO)
        {
            if (!ModelState.IsValid)
                throw new BindException(ModelState);

            if (!await HasPermission(Provider_ProviderDTO.Id))
                return Forbid();

            Provider Provider = ConvertDTOToEntity(Provider_ProviderDTO);
            Provider = await ProviderService.Delete(Provider);
            Provider_ProviderDTO = new Provider_ProviderDTO(Provider);
            if (Provider.IsValidated)
                return Provider_ProviderDTO;
            else
                return BadRequest(Provider_ProviderDTO);
        }

        [Route(ProviderRoute.Import), HttpPost]
        public async Task<ActionResult<List<Provider_ProviderDTO>>> Import(IFormFile file)
        {
            if (!ModelState.IsValid)
                throw new BindException(ModelState);
            
            DataFile DataFile = new DataFile
            {
                Name = file.FileName,
                Content = file.OpenReadStream(),
            };

            List<Provider> Providers = await ProviderService.Import(DataFile);
            List<Provider_ProviderDTO> Provider_ProviderDTOs = Providers
                .Select(c => new Provider_ProviderDTO(c)).ToList();
            return Provider_ProviderDTOs;
        }

        [Route(ProviderRoute.Export), HttpPost]
        public async Task<ActionResult> Export([FromBody] Provider_ProviderFilterDTO Provider_ProviderFilterDTO)
        {
            if (!ModelState.IsValid)
                throw new BindException(ModelState);

            ProviderFilter ProviderFilter = ConvertFilterDTOToFilterEntity(Provider_ProviderFilterDTO);
            ProviderFilter = ProviderService.ToFilter(ProviderFilter);
            DataFile DataFile = await ProviderService.Export(ProviderFilter);
            return new FileStreamResult(DataFile.Content, StaticParams.ExcelFileType)
            {
                FileDownloadName = DataFile.Name ?? "File export.xlsx",
            };
        }
        
        private async Task<bool> HasPermission(long Id)
        {
            ProviderFilter ProviderFilter = new ProviderFilter
            {
                Id = new IdFilter { Equal = Id },
            };
            ProviderFilter = ProviderService.ToFilter(ProviderFilter);
            int count = await ProviderService.Count(ProviderFilter);
            if (count == 0)
                return false;
            return true;
        }

        public Provider ConvertDTOToEntity(Provider_ProviderDTO Provider_ProviderDTO)
        {
            Provider Provider = new Provider();
            Provider.Id = Provider_ProviderDTO.Id;
            Provider.Name = Provider_ProviderDTO.Name;
            Provider.GoogleRedirectUri = Provider_ProviderDTO.GoogleRedirectUri;
            Provider.ADIP = Provider_ProviderDTO.ADIP;
            Provider.ADUsername = Provider_ProviderDTO.ADUsername;
            Provider.ADPassword = Provider_ProviderDTO.ADPassword;
            Provider.GoogleClient = Provider_ProviderDTO.GoogleClient;
            Provider.GoogleClientSecret = Provider_ProviderDTO.GoogleClientSecret;
            Provider.MicrosoftClient = Provider_ProviderDTO.MicrosoftClient;
            Provider.MicrosoftClientSecret = Provider_ProviderDTO.MicrosoftClientSecret;
            Provider.MicrosoftRedirectUri = Provider_ProviderDTO.MicrosoftRedirectUri;

            return Provider;
        }

        public ProviderFilter ConvertFilterDTOToFilterEntity(Provider_ProviderFilterDTO Provider_ProviderFilterDTO)
        {
            ProviderFilter ProviderFilter = new ProviderFilter();
            ProviderFilter.Selects = ProviderSelect.ALL;
            ProviderFilter.Skip = Provider_ProviderFilterDTO.Skip;
            ProviderFilter.Take = Provider_ProviderFilterDTO.Take;
            ProviderFilter.OrderBy = Provider_ProviderFilterDTO.OrderBy;
            ProviderFilter.OrderType = Provider_ProviderFilterDTO.OrderType;

            ProviderFilter.Id = Provider_ProviderFilterDTO.Id;
            ProviderFilter.Name = Provider_ProviderFilterDTO.Name;
            ProviderFilter.GoogleRedirectUri = Provider_ProviderFilterDTO.GoogleRedirectUri;
            ProviderFilter.ADIP = Provider_ProviderFilterDTO.ADIP;
            ProviderFilter.ADUsername = Provider_ProviderFilterDTO.ADUsername;
            ProviderFilter.ADPassword = Provider_ProviderFilterDTO.ADPassword;
            ProviderFilter.GoogleClient = Provider_ProviderFilterDTO.GoogleClient;
            ProviderFilter.GoogleClientSecret = Provider_ProviderFilterDTO.GoogleClientSecret;
            ProviderFilter.MicrosoftClient = Provider_ProviderFilterDTO.MicrosoftClient;
            ProviderFilter.MicrosoftClientSecret = Provider_ProviderFilterDTO.MicrosoftClientSecret;
            ProviderFilter.MicrosoftRedirectUri = Provider_ProviderFilterDTO.MicrosoftRedirectUri;
            return ProviderFilter;
        }


    }
}

