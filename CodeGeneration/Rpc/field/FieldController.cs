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
using Portal.BE.Services.MField;
using Portal.BE.Services.MView;
using Portal.BE.Services.MPermission;

namespace Portal.BE.Rpc.field
{
    public class FieldRoute : Root
    {
        public const string Master = Module + "/field/field-master";
        public const string Detail = Module + "/field/field-detail";
        private const string Default = Rpc + Module + "/field";
        public const string Count = Default + "/count";
        public const string List = Default + "/list";
        public const string Get = Default + "/get";
        public const string Create = Default + "/create";
        public const string Update = Default + "/update";
        public const string Delete = Default + "/delete";
        public const string Import = Default + "/import";
        public const string Export = Default + "/export";

        public const string SingleListView = Default + "/single-list-view";
        public const string SingleListPermission = Default + "/single-list-permission";
        public const string CountPermission = Default + "/count-permission";
        public const string ListPermission = Default + "/list-permission";
        public static Dictionary<string, FieldType> Filters = new Dictionary<string, FieldType>
        {
            { nameof(FieldFilter.Id), FieldType.ID },
            { nameof(FieldFilter.Name), FieldType.STRING },
            { nameof(FieldFilter.Type), FieldType.STRING },
            { nameof(FieldFilter.ViewId), FieldType.ID },
        };
    }

    public class FieldController : RpcController
    {
        private IViewService ViewService;
        private IPermissionService PermissionService;
        private IFieldService FieldService;

        public FieldController(
            IViewService ViewService,
            IPermissionService PermissionService,
            IFieldService FieldService
        )
        {
            this.ViewService = ViewService;
            this.PermissionService = PermissionService;
            this.FieldService = FieldService;
        }

        [Route(FieldRoute.Count), HttpPost]
        public async Task<ActionResult<int>> Count([FromBody] Field_FieldFilterDTO Field_FieldFilterDTO)
        {
            if (!ModelState.IsValid)
                throw new BindException(ModelState);

            FieldFilter FieldFilter = ConvertFilterDTOToFilterEntity(Field_FieldFilterDTO);
            FieldFilter = FieldService.ToFilter(FieldFilter);
            int count = await FieldService.Count(FieldFilter);
            return count;
        }

        [Route(FieldRoute.List), HttpPost]
        public async Task<ActionResult<List<Field_FieldDTO>>> List([FromBody] Field_FieldFilterDTO Field_FieldFilterDTO)
        {
            if (!ModelState.IsValid)
                throw new BindException(ModelState);

            FieldFilter FieldFilter = ConvertFilterDTOToFilterEntity(Field_FieldFilterDTO);
            FieldFilter = FieldService.ToFilter(FieldFilter);
            List<Field> Fields = await FieldService.List(FieldFilter);
            List<Field_FieldDTO> Field_FieldDTOs = Fields
                .Select(c => new Field_FieldDTO(c)).ToList();
            return Field_FieldDTOs;
        }

        [Route(FieldRoute.Get), HttpPost]
        public async Task<ActionResult<Field_FieldDTO>> Get([FromBody]Field_FieldDTO Field_FieldDTO)
        {
            if (!ModelState.IsValid)
                throw new BindException(ModelState);

            if (!await HasPermission(Field_FieldDTO.Id))
                return Forbid();

            Field Field = await FieldService.Get(Field_FieldDTO.Id);
            return new Field_FieldDTO(Field);
        }

        [Route(FieldRoute.Create), HttpPost]
        public async Task<ActionResult<Field_FieldDTO>> Create([FromBody] Field_FieldDTO Field_FieldDTO)
        {
            if (!ModelState.IsValid)
                throw new BindException(ModelState);
            
            if (!await HasPermission(Field_FieldDTO.Id))
                return Forbid();

            Field Field = ConvertDTOToEntity(Field_FieldDTO);
            Field = await FieldService.Create(Field);
            Field_FieldDTO = new Field_FieldDTO(Field);
            if (Field.IsValidated)
                return Field_FieldDTO;
            else
                return BadRequest(Field_FieldDTO);
        }

        [Route(FieldRoute.Update), HttpPost]
        public async Task<ActionResult<Field_FieldDTO>> Update([FromBody] Field_FieldDTO Field_FieldDTO)
        {
            if (!ModelState.IsValid)
                throw new BindException(ModelState);
            
            if (!await HasPermission(Field_FieldDTO.Id))
                return Forbid();

            Field Field = ConvertDTOToEntity(Field_FieldDTO);
            Field = await FieldService.Update(Field);
            Field_FieldDTO = new Field_FieldDTO(Field);
            if (Field.IsValidated)
                return Field_FieldDTO;
            else
                return BadRequest(Field_FieldDTO);
        }

        [Route(FieldRoute.Delete), HttpPost]
        public async Task<ActionResult<Field_FieldDTO>> Delete([FromBody] Field_FieldDTO Field_FieldDTO)
        {
            if (!ModelState.IsValid)
                throw new BindException(ModelState);

            if (!await HasPermission(Field_FieldDTO.Id))
                return Forbid();

            Field Field = ConvertDTOToEntity(Field_FieldDTO);
            Field = await FieldService.Delete(Field);
            Field_FieldDTO = new Field_FieldDTO(Field);
            if (Field.IsValidated)
                return Field_FieldDTO;
            else
                return BadRequest(Field_FieldDTO);
        }

        [Route(FieldRoute.Import), HttpPost]
        public async Task<ActionResult<List<Field_FieldDTO>>> Import(IFormFile file)
        {
            if (!ModelState.IsValid)
                throw new BindException(ModelState);
            
            DataFile DataFile = new DataFile
            {
                Name = file.FileName,
                Content = file.OpenReadStream(),
            };

            List<Field> Fields = await FieldService.Import(DataFile);
            List<Field_FieldDTO> Field_FieldDTOs = Fields
                .Select(c => new Field_FieldDTO(c)).ToList();
            return Field_FieldDTOs;
        }

        [Route(FieldRoute.Export), HttpPost]
        public async Task<ActionResult> Export([FromBody] Field_FieldFilterDTO Field_FieldFilterDTO)
        {
            if (!ModelState.IsValid)
                throw new BindException(ModelState);

            FieldFilter FieldFilter = ConvertFilterDTOToFilterEntity(Field_FieldFilterDTO);
            FieldFilter = FieldService.ToFilter(FieldFilter);
            DataFile DataFile = await FieldService.Export(FieldFilter);
            return new FileStreamResult(DataFile.Content, StaticParams.ExcelFileType)
            {
                FileDownloadName = DataFile.Name ?? "File export.xlsx",
            };
        }
        
        private async Task<bool> HasPermission(long Id)
        {
            FieldFilter FieldFilter = new FieldFilter
            {
                Id = new IdFilter { Equal = Id },
            };
            FieldFilter = FieldService.ToFilter(FieldFilter);
            int count = await FieldService.Count(FieldFilter);
            if (count == 0)
                return false;
            return true;
        }

        public Field ConvertDTOToEntity(Field_FieldDTO Field_FieldDTO)
        {
            Field Field = new Field();
            Field.Id = Field_FieldDTO.Id;
            Field.Name = Field_FieldDTO.Name;
            Field.Type = Field_FieldDTO.Type;
            Field.ViewId = Field_FieldDTO.ViewId;
            Field.IsDeleted = Field_FieldDTO.IsDeleted;
            Field.View = Field_FieldDTO.View == null ? null : new View
            {
                Id = Field_FieldDTO.View.Id,
                Name = Field_FieldDTO.View.Name,
                Path = Field_FieldDTO.View.Path,
                IsDeleted = Field_FieldDTO.View.IsDeleted,
            };
            Field.PermissionFieldMappings = Field_FieldDTO.PermissionFieldMappings?
                .Select(x => new PermissionFieldMapping
                {
                    PermissionId = x.PermissionId,
                    FieldId = x.FieldId,
                    Value = x.Value,
                    Permission = new Permission
                    {
                        Id = x.Permission.Id,
                        Name = x.Permission.Name,
                        RoleId = x.Permission.RoleId,
                        ViewId = x.Permission.ViewId,
                    }
                }).ToList();

            return Field;
        }

        public FieldFilter ConvertFilterDTOToFilterEntity(Field_FieldFilterDTO Field_FieldFilterDTO)
        {
            FieldFilter FieldFilter = new FieldFilter();
            FieldFilter.Selects = FieldSelect.ALL;
            FieldFilter.Skip = Field_FieldFilterDTO.Skip;
            FieldFilter.Take = Field_FieldFilterDTO.Take;
            FieldFilter.OrderBy = Field_FieldFilterDTO.OrderBy;
            FieldFilter.OrderType = Field_FieldFilterDTO.OrderType;

            FieldFilter.Id = Field_FieldFilterDTO.Id;
            FieldFilter.Name = Field_FieldFilterDTO.Name;
            FieldFilter.Type = Field_FieldFilterDTO.Type;
            FieldFilter.ViewId = Field_FieldFilterDTO.ViewId;
            return FieldFilter;
        }

        [Route(FieldRoute.SingleListView), HttpPost]
        public async Task<List<Field_ViewDTO>> SingleListView([FromBody] Field_ViewFilterDTO Field_ViewFilterDTO)
        {
            ViewFilter ViewFilter = new ViewFilter();
            ViewFilter.Skip = 0;
            ViewFilter.Take = 20;
            ViewFilter.OrderBy = ViewOrder.Id;
            ViewFilter.OrderType = OrderType.ASC;
            ViewFilter.Selects = ViewSelect.ALL;
            ViewFilter.Id = Field_ViewFilterDTO.Id;
            ViewFilter.Name = Field_ViewFilterDTO.Name;
            ViewFilter.Path = Field_ViewFilterDTO.Path;

            List<View> Views = await ViewService.List(ViewFilter);
            List<Field_ViewDTO> Field_ViewDTOs = Views
                .Select(x => new Field_ViewDTO(x)).ToList();
            return Field_ViewDTOs;
        }
        [Route(FieldRoute.SingleListPermission), HttpPost]
        public async Task<List<Field_PermissionDTO>> SingleListPermission([FromBody] Field_PermissionFilterDTO Field_PermissionFilterDTO)
        {
            PermissionFilter PermissionFilter = new PermissionFilter();
            PermissionFilter.Skip = 0;
            PermissionFilter.Take = 20;
            PermissionFilter.OrderBy = PermissionOrder.Id;
            PermissionFilter.OrderType = OrderType.ASC;
            PermissionFilter.Selects = PermissionSelect.ALL;
            PermissionFilter.Id = Field_PermissionFilterDTO.Id;
            PermissionFilter.Name = Field_PermissionFilterDTO.Name;
            PermissionFilter.RoleId = Field_PermissionFilterDTO.RoleId;
            PermissionFilter.ViewId = Field_PermissionFilterDTO.ViewId;

            List<Permission> Permissions = await PermissionService.List(PermissionFilter);
            List<Field_PermissionDTO> Field_PermissionDTOs = Permissions
                .Select(x => new Field_PermissionDTO(x)).ToList();
            return Field_PermissionDTOs;
        }

        [Route(FieldRoute.CountPermission), HttpPost]
        public async Task<long> CountPermission([FromBody] Field_PermissionFilterDTO Field_PermissionFilterDTO)
        {
            PermissionFilter PermissionFilter = new PermissionFilter();

            return await PermissionService.Count(PermissionFilter);
        }

        [Route(FieldRoute.ListPermission), HttpPost]
        public async Task<List<Field_PermissionDTO>> ListPermission([FromBody] Field_PermissionFilterDTO Field_PermissionFilterDTO)
        {
            PermissionFilter PermissionFilter = new PermissionFilter();
            PermissionFilter.Skip = Field_PermissionFilterDTO.Skip;
            PermissionFilter.Take = Field_PermissionFilterDTO.Take;
            PermissionFilter.OrderBy = PermissionOrder.Id;
            PermissionFilter.OrderType = OrderType.ASC;
            PermissionFilter.Selects = PermissionSelect.ALL;

            List<Permission> Permissions = await PermissionService.List(PermissionFilter);
            List<Field_PermissionDTO> Field_PermissionDTOs = Permissions
                .Select(x => new Field_PermissionDTO(x)).ToList();
            return Field_PermissionDTOs;
        }
    }
}

