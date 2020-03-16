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
using Portal.BE.Services.MView;
using Portal.BE.Services.MRole;

namespace Portal.BE.Rpc.view
{
    public class ViewRoute : Root
    {
        public const string Master = Module + "/view/view-master";
        public const string Detail = Module + "/view/view-detail";
        private const string Default = Rpc + Module + "/view";
        public const string Count = Default + "/count";
        public const string List = Default + "/list";
        public const string Get = Default + "/get";
        public const string Create = Default + "/create";
        public const string Update = Default + "/update";
        public const string Delete = Default + "/delete";
        public const string Import = Default + "/import";
        public const string Export = Default + "/export";

        public const string SingleListRole = Default + "/single-list-role";
        public static Dictionary<string, FieldType> Filters = new Dictionary<string, FieldType>
        {
            { nameof(ViewFilter.Id), FieldType.ID },
            { nameof(ViewFilter.Name), FieldType.STRING },
            { nameof(ViewFilter.Path), FieldType.STRING },
        };
    }

    public class ViewController : RpcController
    {
        private IRoleService RoleService;
        private IViewService ViewService;

        public ViewController(
            IRoleService RoleService,
            IViewService ViewService
        )
        {
            this.RoleService = RoleService;
            this.ViewService = ViewService;
        }

        [Route(ViewRoute.Count), HttpPost]
        public async Task<ActionResult<int>> Count([FromBody] View_ViewFilterDTO View_ViewFilterDTO)
        {
            if (!ModelState.IsValid)
                throw new BindException(ModelState);

            ViewFilter ViewFilter = ConvertFilterDTOToFilterEntity(View_ViewFilterDTO);
            ViewFilter = ViewService.ToFilter(ViewFilter);
            int count = await ViewService.Count(ViewFilter);
            return count;
        }

        [Route(ViewRoute.List), HttpPost]
        public async Task<ActionResult<List<View_ViewDTO>>> List([FromBody] View_ViewFilterDTO View_ViewFilterDTO)
        {
            if (!ModelState.IsValid)
                throw new BindException(ModelState);

            ViewFilter ViewFilter = ConvertFilterDTOToFilterEntity(View_ViewFilterDTO);
            ViewFilter = ViewService.ToFilter(ViewFilter);
            List<View> Views = await ViewService.List(ViewFilter);
            List<View_ViewDTO> View_ViewDTOs = Views
                .Select(c => new View_ViewDTO(c)).ToList();
            return View_ViewDTOs;
        }

        [Route(ViewRoute.Get), HttpPost]
        public async Task<ActionResult<View_ViewDTO>> Get([FromBody]View_ViewDTO View_ViewDTO)
        {
            if (!ModelState.IsValid)
                throw new BindException(ModelState);

            if (!await HasPermission(View_ViewDTO.Id))
                return Forbid();

            View View = await ViewService.Get(View_ViewDTO.Id);
            return new View_ViewDTO(View);
        }

        [Route(ViewRoute.Create), HttpPost]
        public async Task<ActionResult<View_ViewDTO>> Create([FromBody] View_ViewDTO View_ViewDTO)
        {
            if (!ModelState.IsValid)
                throw new BindException(ModelState);
            
            if (!await HasPermission(View_ViewDTO.Id))
                return Forbid();

            View View = ConvertDTOToEntity(View_ViewDTO);
            View = await ViewService.Create(View);
            View_ViewDTO = new View_ViewDTO(View);
            if (View.IsValidated)
                return View_ViewDTO;
            else
                return BadRequest(View_ViewDTO);
        }

        [Route(ViewRoute.Update), HttpPost]
        public async Task<ActionResult<View_ViewDTO>> Update([FromBody] View_ViewDTO View_ViewDTO)
        {
            if (!ModelState.IsValid)
                throw new BindException(ModelState);
            
            if (!await HasPermission(View_ViewDTO.Id))
                return Forbid();

            View View = ConvertDTOToEntity(View_ViewDTO);
            View = await ViewService.Update(View);
            View_ViewDTO = new View_ViewDTO(View);
            if (View.IsValidated)
                return View_ViewDTO;
            else
                return BadRequest(View_ViewDTO);
        }

        [Route(ViewRoute.Delete), HttpPost]
        public async Task<ActionResult<View_ViewDTO>> Delete([FromBody] View_ViewDTO View_ViewDTO)
        {
            if (!ModelState.IsValid)
                throw new BindException(ModelState);

            if (!await HasPermission(View_ViewDTO.Id))
                return Forbid();

            View View = ConvertDTOToEntity(View_ViewDTO);
            View = await ViewService.Delete(View);
            View_ViewDTO = new View_ViewDTO(View);
            if (View.IsValidated)
                return View_ViewDTO;
            else
                return BadRequest(View_ViewDTO);
        }

        [Route(ViewRoute.Import), HttpPost]
        public async Task<ActionResult<List<View_ViewDTO>>> Import(IFormFile file)
        {
            if (!ModelState.IsValid)
                throw new BindException(ModelState);
            
            DataFile DataFile = new DataFile
            {
                Name = file.FileName,
                Content = file.OpenReadStream(),
            };

            List<View> Views = await ViewService.Import(DataFile);
            List<View_ViewDTO> View_ViewDTOs = Views
                .Select(c => new View_ViewDTO(c)).ToList();
            return View_ViewDTOs;
        }

        [Route(ViewRoute.Export), HttpPost]
        public async Task<ActionResult> Export([FromBody] View_ViewFilterDTO View_ViewFilterDTO)
        {
            if (!ModelState.IsValid)
                throw new BindException(ModelState);

            ViewFilter ViewFilter = ConvertFilterDTOToFilterEntity(View_ViewFilterDTO);
            ViewFilter = ViewService.ToFilter(ViewFilter);
            DataFile DataFile = await ViewService.Export(ViewFilter);
            return new FileStreamResult(DataFile.Content, StaticParams.ExcelFileType)
            {
                FileDownloadName = DataFile.Name ?? "File export.xlsx",
            };
        }
        
        private async Task<bool> HasPermission(long Id)
        {
            ViewFilter ViewFilter = new ViewFilter
            {
                Id = new IdFilter { Equal = Id },
            };
            ViewFilter = ViewService.ToFilter(ViewFilter);
            int count = await ViewService.Count(ViewFilter);
            if (count == 0)
                return false;
            return true;
        }

        public View ConvertDTOToEntity(View_ViewDTO View_ViewDTO)
        {
            View View = new View();
            View.Id = View_ViewDTO.Id;
            View.Name = View_ViewDTO.Name;
            View.Path = View_ViewDTO.Path;
            View.IsDeleted = View_ViewDTO.IsDeleted;
            View.Fields = View_ViewDTO.Fields?
                .Select(x => new Field
                {
                    Id = x.Id,
                    Name = x.Name,
                    Type = x.Type,
                    ViewId = x.ViewId,
                    IsDeleted = x.IsDeleted,
                }).ToList();
            View.Pages = View_ViewDTO.Pages?
                .Select(x => new Page
                {
                    Id = x.Id,
                    Name = x.Name,
                    Path = x.Path,
                    ViewId = x.ViewId,
                    IsDeleted = x.IsDeleted,
                }).ToList();
            View.Permissions = View_ViewDTO.Permissions?
                .Select(x => new Permission
                {
                    Id = x.Id,
                    Name = x.Name,
                    RoleId = x.RoleId,
                    ViewId = x.ViewId,
                    Role = new Role
                    {
                        Id = x.Role.Id,
                        Name = x.Role.Name,
                    }
                }).ToList();

            return View;
        }

        public ViewFilter ConvertFilterDTOToFilterEntity(View_ViewFilterDTO View_ViewFilterDTO)
        {
            ViewFilter ViewFilter = new ViewFilter();
            ViewFilter.Selects = ViewSelect.ALL;
            ViewFilter.Skip = View_ViewFilterDTO.Skip;
            ViewFilter.Take = View_ViewFilterDTO.Take;
            ViewFilter.OrderBy = View_ViewFilterDTO.OrderBy;
            ViewFilter.OrderType = View_ViewFilterDTO.OrderType;

            ViewFilter.Id = View_ViewFilterDTO.Id;
            ViewFilter.Name = View_ViewFilterDTO.Name;
            ViewFilter.Path = View_ViewFilterDTO.Path;
            return ViewFilter;
        }

        [Route(ViewRoute.SingleListRole), HttpPost]
        public async Task<List<View_RoleDTO>> SingleListRole([FromBody] View_RoleFilterDTO View_RoleFilterDTO)
        {
            RoleFilter RoleFilter = new RoleFilter();
            RoleFilter.Skip = 0;
            RoleFilter.Take = 20;
            RoleFilter.OrderBy = RoleOrder.Id;
            RoleFilter.OrderType = OrderType.ASC;
            RoleFilter.Selects = RoleSelect.ALL;
            RoleFilter.Id = View_RoleFilterDTO.Id;
            RoleFilter.Name = View_RoleFilterDTO.Name;

            List<Role> Roles = await RoleService.List(RoleFilter);
            List<View_RoleDTO> View_RoleDTOs = Roles
                .Select(x => new View_RoleDTO(x)).ToList();
            return View_RoleDTOs;
        }

    }
}

