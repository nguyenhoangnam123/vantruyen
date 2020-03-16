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
using Portal.BE.Services.MSite;

namespace Portal.BE.Rpc.site
{
    public class SiteRoute : Root
    {
        public const string Master = Module + "/site/site-master";
        public const string Detail = Module + "/site/site-detail";
        private const string Default = Rpc + Module + "/site";
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
            { nameof(SiteFilter.Id), FieldType.ID },
            { nameof(SiteFilter.Name), FieldType.STRING },
            { nameof(SiteFilter.URL), FieldType.STRING },
            { nameof(SiteFilter.Status), FieldType.LONG },
        };
    }

    public class SiteController : RpcController
    {
        private ISiteService SiteService;

        public SiteController(
            ISiteService SiteService
        )
        {
            this.SiteService = SiteService;
        }

        [Route(SiteRoute.Count), HttpPost]
        public async Task<ActionResult<int>> Count([FromBody] Site_SiteFilterDTO Site_SiteFilterDTO)
        {
            if (!ModelState.IsValid)
                throw new BindException(ModelState);

            SiteFilter SiteFilter = ConvertFilterDTOToFilterEntity(Site_SiteFilterDTO);
            SiteFilter = SiteService.ToFilter(SiteFilter);
            int count = await SiteService.Count(SiteFilter);
            return count;
        }

        [Route(SiteRoute.List), HttpPost]
        public async Task<ActionResult<List<Site_SiteDTO>>> List([FromBody] Site_SiteFilterDTO Site_SiteFilterDTO)
        {
            if (!ModelState.IsValid)
                throw new BindException(ModelState);

            SiteFilter SiteFilter = ConvertFilterDTOToFilterEntity(Site_SiteFilterDTO);
            SiteFilter = SiteService.ToFilter(SiteFilter);
            List<Site> Sites = await SiteService.List(SiteFilter);
            List<Site_SiteDTO> Site_SiteDTOs = Sites
                .Select(c => new Site_SiteDTO(c)).ToList();
            return Site_SiteDTOs;
        }

        [Route(SiteRoute.Get), HttpPost]
        public async Task<ActionResult<Site_SiteDTO>> Get([FromBody]Site_SiteDTO Site_SiteDTO)
        {
            if (!ModelState.IsValid)
                throw new BindException(ModelState);

            if (!await HasPermission(Site_SiteDTO.Id))
                return Forbid();

            Site Site = await SiteService.Get(Site_SiteDTO.Id);
            return new Site_SiteDTO(Site);
        }

        [Route(SiteRoute.Create), HttpPost]
        public async Task<ActionResult<Site_SiteDTO>> Create([FromBody] Site_SiteDTO Site_SiteDTO)
        {
            if (!ModelState.IsValid)
                throw new BindException(ModelState);
            
            if (!await HasPermission(Site_SiteDTO.Id))
                return Forbid();

            Site Site = ConvertDTOToEntity(Site_SiteDTO);
            Site = await SiteService.Create(Site);
            Site_SiteDTO = new Site_SiteDTO(Site);
            if (Site.IsValidated)
                return Site_SiteDTO;
            else
                return BadRequest(Site_SiteDTO);
        }

        [Route(SiteRoute.Update), HttpPost]
        public async Task<ActionResult<Site_SiteDTO>> Update([FromBody] Site_SiteDTO Site_SiteDTO)
        {
            if (!ModelState.IsValid)
                throw new BindException(ModelState);
            
            if (!await HasPermission(Site_SiteDTO.Id))
                return Forbid();

            Site Site = ConvertDTOToEntity(Site_SiteDTO);
            Site = await SiteService.Update(Site);
            Site_SiteDTO = new Site_SiteDTO(Site);
            if (Site.IsValidated)
                return Site_SiteDTO;
            else
                return BadRequest(Site_SiteDTO);
        }

        [Route(SiteRoute.Delete), HttpPost]
        public async Task<ActionResult<Site_SiteDTO>> Delete([FromBody] Site_SiteDTO Site_SiteDTO)
        {
            if (!ModelState.IsValid)
                throw new BindException(ModelState);

            if (!await HasPermission(Site_SiteDTO.Id))
                return Forbid();

            Site Site = ConvertDTOToEntity(Site_SiteDTO);
            Site = await SiteService.Delete(Site);
            Site_SiteDTO = new Site_SiteDTO(Site);
            if (Site.IsValidated)
                return Site_SiteDTO;
            else
                return BadRequest(Site_SiteDTO);
        }

        [Route(SiteRoute.Import), HttpPost]
        public async Task<ActionResult<List<Site_SiteDTO>>> Import(IFormFile file)
        {
            if (!ModelState.IsValid)
                throw new BindException(ModelState);
            
            DataFile DataFile = new DataFile
            {
                Name = file.FileName,
                Content = file.OpenReadStream(),
            };

            List<Site> Sites = await SiteService.Import(DataFile);
            List<Site_SiteDTO> Site_SiteDTOs = Sites
                .Select(c => new Site_SiteDTO(c)).ToList();
            return Site_SiteDTOs;
        }

        [Route(SiteRoute.Export), HttpPost]
        public async Task<ActionResult> Export([FromBody] Site_SiteFilterDTO Site_SiteFilterDTO)
        {
            if (!ModelState.IsValid)
                throw new BindException(ModelState);

            SiteFilter SiteFilter = ConvertFilterDTOToFilterEntity(Site_SiteFilterDTO);
            SiteFilter = SiteService.ToFilter(SiteFilter);
            DataFile DataFile = await SiteService.Export(SiteFilter);
            return new FileStreamResult(DataFile.Content, StaticParams.ExcelFileType)
            {
                FileDownloadName = DataFile.Name ?? "File export.xlsx",
            };
        }
        
        private async Task<bool> HasPermission(long Id)
        {
            SiteFilter SiteFilter = new SiteFilter
            {
                Id = new IdFilter { Equal = Id },
            };
            SiteFilter = SiteService.ToFilter(SiteFilter);
            int count = await SiteService.Count(SiteFilter);
            if (count == 0)
                return false;
            return true;
        }

        public Site ConvertDTOToEntity(Site_SiteDTO Site_SiteDTO)
        {
            Site Site = new Site();
            Site.Id = Site_SiteDTO.Id;
            Site.Name = Site_SiteDTO.Name;
            Site.URL = Site_SiteDTO.URL;
            Site.Status = Site_SiteDTO.Status;

            return Site;
        }

        public SiteFilter ConvertFilterDTOToFilterEntity(Site_SiteFilterDTO Site_SiteFilterDTO)
        {
            SiteFilter SiteFilter = new SiteFilter();
            SiteFilter.Selects = SiteSelect.ALL;
            SiteFilter.Skip = Site_SiteFilterDTO.Skip;
            SiteFilter.Take = Site_SiteFilterDTO.Take;
            SiteFilter.OrderBy = Site_SiteFilterDTO.OrderBy;
            SiteFilter.OrderType = Site_SiteFilterDTO.OrderType;

            SiteFilter.Id = Site_SiteFilterDTO.Id;
            SiteFilter.Name = Site_SiteFilterDTO.Name;
            SiteFilter.URL = Site_SiteFilterDTO.URL;
            SiteFilter.Status = Site_SiteFilterDTO.Status;
            return SiteFilter;
        }


    }
}

