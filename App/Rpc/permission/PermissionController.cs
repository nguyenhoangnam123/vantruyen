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
using Portal.BE.Services.MPermission;
using Portal.BE.Services.MRole;
using Portal.BE.Services.MView;
using Portal.BE.Services.MField;
using Portal.BE.Services.MPage;

namespace Portal.BE.Rpc.permission
{
    public class PermissionRoute : Root
    {
        public const string Master = Module + "/permission/permission-master";
        public const string Detail = Module + "/permission/permission-detail";
        private const string Default = Rpc + Module + "/permission";
        public const string Count = Default + "/count";
        public const string List = Default + "/list";
        public const string Get = Default + "/get";
        public const string Create = Default + "/create";
        public const string Update = Default + "/update";
        public const string Delete = Default + "/delete";
        public const string Import = Default + "/import";
        public const string Export = Default + "/export";

        public const string SingleListRole = Default + "/single-list-role";
        public const string SingleListView = Default + "/single-list-view";
        public const string SingleListField = Default + "/single-list-field";
        public const string SingleListPage = Default + "/single-list-page";
        public const string CountField = Default + "/count-field";
        public const string ListField = Default + "/list-field";
        public const string CountPage = Default + "/count-page";
        public const string ListPage = Default + "/list-page";
        public static Dictionary<string, FieldType> Filters = new Dictionary<string, FieldType>
        {
            { nameof(PermissionFilter.Id), FieldType.ID },
            { nameof(PermissionFilter.Name), FieldType.STRING },
            { nameof(PermissionFilter.RoleId), FieldType.ID },
            { nameof(PermissionFilter.ViewId), FieldType.ID },
        };
    }

    public class PermissionController : RpcController
    {
        private IRoleService RoleService;
        private IViewService ViewService;
        private IFieldService FieldService;
        private IPageService PageService;
        private IPermissionService PermissionService;

        public PermissionController(
            IRoleService RoleService,
            IViewService ViewService,
            IFieldService FieldService,
            IPageService PageService,
            IPermissionService PermissionService
        )
        {
            this.RoleService = RoleService;
            this.ViewService = ViewService;
            this.FieldService = FieldService;
            this.PageService = PageService;
            this.PermissionService = PermissionService;
        }

        [Route(PermissionRoute.Count), HttpPost]
        public async Task<ActionResult<int>> Count([FromBody] Permission_PermissionFilterDTO Permission_PermissionFilterDTO)
        {
            if (!ModelState.IsValid)
                throw new BindException(ModelState);

            PermissionFilter PermissionFilter = ConvertFilterDTOToFilterEntity(Permission_PermissionFilterDTO);
            PermissionFilter = PermissionService.ToFilter(PermissionFilter);
            int count = await PermissionService.Count(PermissionFilter);
            return count;
        }

        [Route(PermissionRoute.List), HttpPost]
        public async Task<ActionResult<List<Permission_PermissionDTO>>> List([FromBody] Permission_PermissionFilterDTO Permission_PermissionFilterDTO)
        {
            if (!ModelState.IsValid)
                throw new BindException(ModelState);

            PermissionFilter PermissionFilter = ConvertFilterDTOToFilterEntity(Permission_PermissionFilterDTO);
            PermissionFilter = PermissionService.ToFilter(PermissionFilter);
            List<Permission> Permissions = await PermissionService.List(PermissionFilter);
            List<Permission_PermissionDTO> Permission_PermissionDTOs = Permissions
                .Select(c => new Permission_PermissionDTO(c)).ToList();
            return Permission_PermissionDTOs;
        }

        [Route(PermissionRoute.Get), HttpPost]
        public async Task<ActionResult<Permission_PermissionDTO>> Get([FromBody]Permission_PermissionDTO Permission_PermissionDTO)
        {
            if (!ModelState.IsValid)
                throw new BindException(ModelState);

            if (!await HasPermission(Permission_PermissionDTO.Id))
                return Forbid();

            Permission Permission = await PermissionService.Get(Permission_PermissionDTO.Id);
            return new Permission_PermissionDTO(Permission);
        }

        [Route(PermissionRoute.Create), HttpPost]
        public async Task<ActionResult<Permission_PermissionDTO>> Create([FromBody] Permission_PermissionDTO Permission_PermissionDTO)
        {
            if (!ModelState.IsValid)
                throw new BindException(ModelState);
            
            if (!await HasPermission(Permission_PermissionDTO.Id))
                return Forbid();

            Permission Permission = ConvertDTOToEntity(Permission_PermissionDTO);
            Permission = await PermissionService.Create(Permission);
            Permission_PermissionDTO = new Permission_PermissionDTO(Permission);
            if (Permission.IsValidated)
                return Permission_PermissionDTO;
            else
                return BadRequest(Permission_PermissionDTO);
        }

        [Route(PermissionRoute.Update), HttpPost]
        public async Task<ActionResult<Permission_PermissionDTO>> Update([FromBody] Permission_PermissionDTO Permission_PermissionDTO)
        {
            if (!ModelState.IsValid)
                throw new BindException(ModelState);
            
            if (!await HasPermission(Permission_PermissionDTO.Id))
                return Forbid();

            Permission Permission = ConvertDTOToEntity(Permission_PermissionDTO);
            Permission = await PermissionService.Update(Permission);
            Permission_PermissionDTO = new Permission_PermissionDTO(Permission);
            if (Permission.IsValidated)
                return Permission_PermissionDTO;
            else
                return BadRequest(Permission_PermissionDTO);
        }

        [Route(PermissionRoute.Delete), HttpPost]
        public async Task<ActionResult<Permission_PermissionDTO>> Delete([FromBody] Permission_PermissionDTO Permission_PermissionDTO)
        {
            if (!ModelState.IsValid)
                throw new BindException(ModelState);

            if (!await HasPermission(Permission_PermissionDTO.Id))
                return Forbid();

            Permission Permission = ConvertDTOToEntity(Permission_PermissionDTO);
            Permission = await PermissionService.Delete(Permission);
            Permission_PermissionDTO = new Permission_PermissionDTO(Permission);
            if (Permission.IsValidated)
                return Permission_PermissionDTO;
            else
                return BadRequest(Permission_PermissionDTO);
        }

        [Route(PermissionRoute.Import), HttpPost]
        public async Task<ActionResult<List<Permission_PermissionDTO>>> Import(IFormFile file)
        {
            if (!ModelState.IsValid)
                throw new BindException(ModelState);
            
            DataFile DataFile = new DataFile
            {
                Name = file.FileName,
                Content = file.OpenReadStream(),
            };

            List<Permission> Permissions = await PermissionService.Import(DataFile);
            List<Permission_PermissionDTO> Permission_PermissionDTOs = Permissions
                .Select(c => new Permission_PermissionDTO(c)).ToList();
            return Permission_PermissionDTOs;
        }

        [Route(PermissionRoute.Export), HttpPost]
        public async Task<ActionResult> Export([FromBody] Permission_PermissionFilterDTO Permission_PermissionFilterDTO)
        {
            if (!ModelState.IsValid)
                throw new BindException(ModelState);

            PermissionFilter PermissionFilter = ConvertFilterDTOToFilterEntity(Permission_PermissionFilterDTO);
            PermissionFilter = PermissionService.ToFilter(PermissionFilter);
            DataFile DataFile = await PermissionService.Export(PermissionFilter);
            return new FileStreamResult(DataFile.Content, StaticParams.ExcelFileType)
            {
                FileDownloadName = DataFile.Name ?? "File export.xlsx",
            };
        }
        
        private async Task<bool> HasPermission(long Id)
        {
            PermissionFilter PermissionFilter = new PermissionFilter
            {
                Id = new IdFilter { Equal = Id },
            };
            PermissionFilter = PermissionService.ToFilter(PermissionFilter);
            int count = await PermissionService.Count(PermissionFilter);
            if (count == 0)
                return false;
            return true;
        }

        public Permission ConvertDTOToEntity(Permission_PermissionDTO Permission_PermissionDTO)
        {
            Permission Permission = new Permission();
            Permission.Id = Permission_PermissionDTO.Id;
            Permission.Name = Permission_PermissionDTO.Name;
            Permission.RoleId = Permission_PermissionDTO.RoleId;
            Permission.ViewId = Permission_PermissionDTO.ViewId;
            Permission.Role = Permission_PermissionDTO.Role == null ? null : new Role
            {
                Id = Permission_PermissionDTO.Role.Id,
                Name = Permission_PermissionDTO.Role.Name,
            };
            Permission.View = Permission_PermissionDTO.View == null ? null : new View
            {
                Id = Permission_PermissionDTO.View.Id,
                Name = Permission_PermissionDTO.View.Name,
                Path = Permission_PermissionDTO.View.Path,
                IsDeleted = Permission_PermissionDTO.View.IsDeleted,
            };
            Permission.PermissionFieldMappings = Permission_PermissionDTO.PermissionFieldMappings?
                .Select(x => new PermissionFieldMapping
                {
                    PermissionId = x.PermissionId,
                    FieldId = x.FieldId,
                    Value = x.Value,
                    Field = new Field
                    {
                        Id = x.Field.Id,
                        Name = x.Field.Name,
                        Type = x.Field.Type,
                        ViewId = x.Field.ViewId,
                        IsDeleted = x.Field.IsDeleted,
                    }
                }).ToList();
            Permission.PermissionPageMappings = Permission_PermissionDTO.PermissionPageMappings?
                .Select(x => new PermissionPageMapping
                {
                    PermissionId = x.PermissionId,
                    PageId = x.PageId,
                    Page = new Page
                    {
                        Id = x.Page.Id,
                        Name = x.Page.Name,
                        Path = x.Page.Path,
                        ViewId = x.Page.ViewId,
                        IsDeleted = x.Page.IsDeleted,
                    }
                }).ToList();

            return Permission;
        }

        public PermissionFilter ConvertFilterDTOToFilterEntity(Permission_PermissionFilterDTO Permission_PermissionFilterDTO)
        {
            PermissionFilter PermissionFilter = new PermissionFilter();
            PermissionFilter.Selects = PermissionSelect.ALL;
            PermissionFilter.Skip = Permission_PermissionFilterDTO.Skip;
            PermissionFilter.Take = Permission_PermissionFilterDTO.Take;
            PermissionFilter.OrderBy = Permission_PermissionFilterDTO.OrderBy;
            PermissionFilter.OrderType = Permission_PermissionFilterDTO.OrderType;

            PermissionFilter.Id = Permission_PermissionFilterDTO.Id;
            PermissionFilter.Name = Permission_PermissionFilterDTO.Name;
            PermissionFilter.RoleId = Permission_PermissionFilterDTO.RoleId;
            PermissionFilter.ViewId = Permission_PermissionFilterDTO.ViewId;
            return PermissionFilter;
        }

        [Route(PermissionRoute.SingleListRole), HttpPost]
        public async Task<List<Permission_RoleDTO>> SingleListRole([FromBody] Permission_RoleFilterDTO Permission_RoleFilterDTO)
        {
            RoleFilter RoleFilter = new RoleFilter();
            RoleFilter.Skip = 0;
            RoleFilter.Take = 20;
            RoleFilter.OrderBy = RoleOrder.Id;
            RoleFilter.OrderType = OrderType.ASC;
            RoleFilter.Selects = RoleSelect.ALL;
            RoleFilter.Id = Permission_RoleFilterDTO.Id;
            RoleFilter.Name = Permission_RoleFilterDTO.Name;

            List<Role> Roles = await RoleService.List(RoleFilter);
            List<Permission_RoleDTO> Permission_RoleDTOs = Roles
                .Select(x => new Permission_RoleDTO(x)).ToList();
            return Permission_RoleDTOs;
        }
        [Route(PermissionRoute.SingleListView), HttpPost]
        public async Task<List<Permission_ViewDTO>> SingleListView([FromBody] Permission_ViewFilterDTO Permission_ViewFilterDTO)
        {
            ViewFilter ViewFilter = new ViewFilter();
            ViewFilter.Skip = 0;
            ViewFilter.Take = 20;
            ViewFilter.OrderBy = ViewOrder.Id;
            ViewFilter.OrderType = OrderType.ASC;
            ViewFilter.Selects = ViewSelect.ALL;
            ViewFilter.Id = Permission_ViewFilterDTO.Id;
            ViewFilter.Name = Permission_ViewFilterDTO.Name;
            ViewFilter.Path = Permission_ViewFilterDTO.Path;

            List<View> Views = await ViewService.List(ViewFilter);
            List<Permission_ViewDTO> Permission_ViewDTOs = Views
                .Select(x => new Permission_ViewDTO(x)).ToList();
            return Permission_ViewDTOs;
        }
        [Route(PermissionRoute.SingleListField), HttpPost]
        public async Task<List<Permission_FieldDTO>> SingleListField([FromBody] Permission_FieldFilterDTO Permission_FieldFilterDTO)
        {
            FieldFilter FieldFilter = new FieldFilter();
            FieldFilter.Skip = 0;
            FieldFilter.Take = 20;
            FieldFilter.OrderBy = FieldOrder.Id;
            FieldFilter.OrderType = OrderType.ASC;
            FieldFilter.Selects = FieldSelect.ALL;
            FieldFilter.Id = Permission_FieldFilterDTO.Id;
            FieldFilter.Name = Permission_FieldFilterDTO.Name;
            FieldFilter.Type = Permission_FieldFilterDTO.Type;
            FieldFilter.ViewId = Permission_FieldFilterDTO.ViewId;

            List<Field> Fields = await FieldService.List(FieldFilter);
            List<Permission_FieldDTO> Permission_FieldDTOs = Fields
                .Select(x => new Permission_FieldDTO(x)).ToList();
            return Permission_FieldDTOs;
        }
        [Route(PermissionRoute.SingleListPage), HttpPost]
        public async Task<List<Permission_PageDTO>> SingleListPage([FromBody] Permission_PageFilterDTO Permission_PageFilterDTO)
        {
            PageFilter PageFilter = new PageFilter();
            PageFilter.Skip = 0;
            PageFilter.Take = 20;
            PageFilter.OrderBy = PageOrder.Id;
            PageFilter.OrderType = OrderType.ASC;
            PageFilter.Selects = PageSelect.ALL;
            PageFilter.Id = Permission_PageFilterDTO.Id;
            PageFilter.Name = Permission_PageFilterDTO.Name;
            PageFilter.Path = Permission_PageFilterDTO.Path;
            PageFilter.ViewId = Permission_PageFilterDTO.ViewId;

            List<Page> Pages = await PageService.List(PageFilter);
            List<Permission_PageDTO> Permission_PageDTOs = Pages
                .Select(x => new Permission_PageDTO(x)).ToList();
            return Permission_PageDTOs;
        }

        [Route(PermissionRoute.CountField), HttpPost]
        public async Task<long> CountField([FromBody] Permission_FieldFilterDTO Permission_FieldFilterDTO)
        {
            FieldFilter FieldFilter = new FieldFilter();

            return await FieldService.Count(FieldFilter);
        }

        [Route(PermissionRoute.ListField), HttpPost]
        public async Task<List<Permission_FieldDTO>> ListField([FromBody] Permission_FieldFilterDTO Permission_FieldFilterDTO)
        {
            FieldFilter FieldFilter = new FieldFilter();
            FieldFilter.Skip = Permission_FieldFilterDTO.Skip;
            FieldFilter.Take = Permission_FieldFilterDTO.Take;
            FieldFilter.OrderBy = FieldOrder.Id;
            FieldFilter.OrderType = OrderType.ASC;
            FieldFilter.Selects = FieldSelect.ALL;

            List<Field> Fields = await FieldService.List(FieldFilter);
            List<Permission_FieldDTO> Permission_FieldDTOs = Fields
                .Select(x => new Permission_FieldDTO(x)).ToList();
            return Permission_FieldDTOs;
        }
        [Route(PermissionRoute.CountPage), HttpPost]
        public async Task<long> CountPage([FromBody] Permission_PageFilterDTO Permission_PageFilterDTO)
        {
            PageFilter PageFilter = new PageFilter();

            return await PageService.Count(PageFilter);
        }

        [Route(PermissionRoute.ListPage), HttpPost]
        public async Task<List<Permission_PageDTO>> ListPage([FromBody] Permission_PageFilterDTO Permission_PageFilterDTO)
        {
            PageFilter PageFilter = new PageFilter();
            PageFilter.Skip = Permission_PageFilterDTO.Skip;
            PageFilter.Take = Permission_PageFilterDTO.Take;
            PageFilter.OrderBy = PageOrder.Id;
            PageFilter.OrderType = OrderType.ASC;
            PageFilter.Selects = PageSelect.ALL;

            List<Page> Pages = await PageService.List(PageFilter);
            List<Permission_PageDTO> Permission_PageDTOs = Pages
                .Select(x => new Permission_PageDTO(x)).ToList();
            return Permission_PageDTOs;
        }
    }
}

