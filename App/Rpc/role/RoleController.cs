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
using Portal.BE.Services.MRole;
using Portal.BE.Services.MApplicationUser;
using Portal.BE.Services.MView;

namespace Portal.BE.Rpc.role
{
    public class RoleRoute : Root
    {
        public const string Master = Module + "/role/role-master";
        public const string Detail = Module + "/role/role-detail";
        private const string Default = Rpc + Module + "/role";
        public const string Count = Default + "/count";
        public const string List = Default + "/list";
        public const string Get = Default + "/get";
        public const string Create = Default + "/create";
        public const string Update = Default + "/update";
        public const string Delete = Default + "/delete";
        public const string Import = Default + "/import";
        public const string Export = Default + "/export";

        public const string SingleListApplicationUser = Default + "/single-list-application-user";
        public const string SingleListView = Default + "/single-list-view";
        public const string CountApplicationUser = Default + "/count-application-user";
        public const string ListApplicationUser = Default + "/list-application-user";
        public static Dictionary<string, FieldType> Filters = new Dictionary<string, FieldType>
        {
            { nameof(RoleFilter.Id), FieldType.ID },
            { nameof(RoleFilter.Name), FieldType.STRING },
        };
    }

    public class RoleController : RpcController
    {
        private IApplicationUserService ApplicationUserService;
        private IViewService ViewService;
        private IRoleService RoleService;

        public RoleController(
            IApplicationUserService ApplicationUserService,
            IViewService ViewService,
            IRoleService RoleService
        )
        {
            this.ApplicationUserService = ApplicationUserService;
            this.ViewService = ViewService;
            this.RoleService = RoleService;
        }

        [Route(RoleRoute.Count), HttpPost]
        public async Task<ActionResult<int>> Count([FromBody] Role_RoleFilterDTO Role_RoleFilterDTO)
        {
            if (!ModelState.IsValid)
                throw new BindException(ModelState);

            RoleFilter RoleFilter = ConvertFilterDTOToFilterEntity(Role_RoleFilterDTO);
            RoleFilter = RoleService.ToFilter(RoleFilter);
            int count = await RoleService.Count(RoleFilter);
            return count;
        }

        [Route(RoleRoute.List), HttpPost]
        public async Task<ActionResult<List<Role_RoleDTO>>> List([FromBody] Role_RoleFilterDTO Role_RoleFilterDTO)
        {
            if (!ModelState.IsValid)
                throw new BindException(ModelState);

            RoleFilter RoleFilter = ConvertFilterDTOToFilterEntity(Role_RoleFilterDTO);
            RoleFilter = RoleService.ToFilter(RoleFilter);
            List<Role> Roles = await RoleService.List(RoleFilter);
            List<Role_RoleDTO> Role_RoleDTOs = Roles
                .Select(c => new Role_RoleDTO(c)).ToList();
            return Role_RoleDTOs;
        }

        [Route(RoleRoute.Get), HttpPost]
        public async Task<ActionResult<Role_RoleDTO>> Get([FromBody]Role_RoleDTO Role_RoleDTO)
        {
            if (!ModelState.IsValid)
                throw new BindException(ModelState);

            if (!await HasPermission(Role_RoleDTO.Id))
                return Forbid();

            Role Role = await RoleService.Get(Role_RoleDTO.Id);
            return new Role_RoleDTO(Role);
        }

        [Route(RoleRoute.Create), HttpPost]
        public async Task<ActionResult<Role_RoleDTO>> Create([FromBody] Role_RoleDTO Role_RoleDTO)
        {
            if (!ModelState.IsValid)
                throw new BindException(ModelState);
            
            if (!await HasPermission(Role_RoleDTO.Id))
                return Forbid();

            Role Role = ConvertDTOToEntity(Role_RoleDTO);
            Role = await RoleService.Create(Role);
            Role_RoleDTO = new Role_RoleDTO(Role);
            if (Role.IsValidated)
                return Role_RoleDTO;
            else
                return BadRequest(Role_RoleDTO);
        }

        [Route(RoleRoute.Update), HttpPost]
        public async Task<ActionResult<Role_RoleDTO>> Update([FromBody] Role_RoleDTO Role_RoleDTO)
        {
            if (!ModelState.IsValid)
                throw new BindException(ModelState);
            
            if (!await HasPermission(Role_RoleDTO.Id))
                return Forbid();

            Role Role = ConvertDTOToEntity(Role_RoleDTO);
            Role = await RoleService.Update(Role);
            Role_RoleDTO = new Role_RoleDTO(Role);
            if (Role.IsValidated)
                return Role_RoleDTO;
            else
                return BadRequest(Role_RoleDTO);
        }

        [Route(RoleRoute.Delete), HttpPost]
        public async Task<ActionResult<Role_RoleDTO>> Delete([FromBody] Role_RoleDTO Role_RoleDTO)
        {
            if (!ModelState.IsValid)
                throw new BindException(ModelState);

            if (!await HasPermission(Role_RoleDTO.Id))
                return Forbid();

            Role Role = ConvertDTOToEntity(Role_RoleDTO);
            Role = await RoleService.Delete(Role);
            Role_RoleDTO = new Role_RoleDTO(Role);
            if (Role.IsValidated)
                return Role_RoleDTO;
            else
                return BadRequest(Role_RoleDTO);
        }

        [Route(RoleRoute.Import), HttpPost]
        public async Task<ActionResult<List<Role_RoleDTO>>> Import(IFormFile file)
        {
            if (!ModelState.IsValid)
                throw new BindException(ModelState);
            
            DataFile DataFile = new DataFile
            {
                Name = file.FileName,
                Content = file.OpenReadStream(),
            };

            List<Role> Roles = await RoleService.Import(DataFile);
            List<Role_RoleDTO> Role_RoleDTOs = Roles
                .Select(c => new Role_RoleDTO(c)).ToList();
            return Role_RoleDTOs;
        }

        [Route(RoleRoute.Export), HttpPost]
        public async Task<ActionResult> Export([FromBody] Role_RoleFilterDTO Role_RoleFilterDTO)
        {
            if (!ModelState.IsValid)
                throw new BindException(ModelState);

            RoleFilter RoleFilter = ConvertFilterDTOToFilterEntity(Role_RoleFilterDTO);
            RoleFilter = RoleService.ToFilter(RoleFilter);
            DataFile DataFile = await RoleService.Export(RoleFilter);
            return new FileStreamResult(DataFile.Content, StaticParams.ExcelFileType)
            {
                FileDownloadName = DataFile.Name ?? "File export.xlsx",
            };
        }
        
        private async Task<bool> HasPermission(long Id)
        {
            RoleFilter RoleFilter = new RoleFilter
            {
                Id = new IdFilter { Equal = Id },
            };
            RoleFilter = RoleService.ToFilter(RoleFilter);
            int count = await RoleService.Count(RoleFilter);
            if (count == 0)
                return false;
            return true;
        }

        public Role ConvertDTOToEntity(Role_RoleDTO Role_RoleDTO)
        {
            Role Role = new Role();
            Role.Id = Role_RoleDTO.Id;
            Role.Name = Role_RoleDTO.Name;
            Role.ApplicationUserRoleMappings = Role_RoleDTO.ApplicationUserRoleMappings?
                .Select(x => new ApplicationUserRoleMapping
                {
                    ApplicationUserId = x.ApplicationUserId,
                    RoleId = x.RoleId,
                    ApplicationUser = new ApplicationUser
                    {
                        Id = x.ApplicationUser.Id,
                        Username = x.ApplicationUser.Username,
                        Password = x.ApplicationUser.Password,
                        DisplayName = x.ApplicationUser.DisplayName,
                        Email = x.ApplicationUser.Email,
                        Phone = x.ApplicationUser.Phone,
                        UserStatusId = x.ApplicationUser.UserStatusId,
                    }
                }).ToList();
            Role.Permissions = Role_RoleDTO.Permissions?
                .Select(x => new Permission
                {
                    Id = x.Id,
                    Name = x.Name,
                    RoleId = x.RoleId,
                    ViewId = x.ViewId,
                    View = new View
                    {
                        Id = x.View.Id,
                        Name = x.View.Name,
                        Path = x.View.Path,
                        IsDeleted = x.View.IsDeleted,
                    }
                }).ToList();

            return Role;
        }

        public RoleFilter ConvertFilterDTOToFilterEntity(Role_RoleFilterDTO Role_RoleFilterDTO)
        {
            RoleFilter RoleFilter = new RoleFilter();
            RoleFilter.Selects = RoleSelect.ALL;
            RoleFilter.Skip = Role_RoleFilterDTO.Skip;
            RoleFilter.Take = Role_RoleFilterDTO.Take;
            RoleFilter.OrderBy = Role_RoleFilterDTO.OrderBy;
            RoleFilter.OrderType = Role_RoleFilterDTO.OrderType;

            RoleFilter.Id = Role_RoleFilterDTO.Id;
            RoleFilter.Name = Role_RoleFilterDTO.Name;
            return RoleFilter;
        }

        [Route(RoleRoute.SingleListApplicationUser), HttpPost]
        public async Task<List<Role_ApplicationUserDTO>> SingleListApplicationUser([FromBody] Role_ApplicationUserFilterDTO Role_ApplicationUserFilterDTO)
        {
            ApplicationUserFilter ApplicationUserFilter = new ApplicationUserFilter();
            ApplicationUserFilter.Skip = 0;
            ApplicationUserFilter.Take = 20;
            ApplicationUserFilter.OrderBy = ApplicationUserOrder.Id;
            ApplicationUserFilter.OrderType = OrderType.ASC;
            ApplicationUserFilter.Selects = ApplicationUserSelect.ALL;
            ApplicationUserFilter.Id = Role_ApplicationUserFilterDTO.Id;
            ApplicationUserFilter.Username = Role_ApplicationUserFilterDTO.Username;
            ApplicationUserFilter.Password = Role_ApplicationUserFilterDTO.Password;
            ApplicationUserFilter.DisplayName = Role_ApplicationUserFilterDTO.DisplayName;
            ApplicationUserFilter.Email = Role_ApplicationUserFilterDTO.Email;
            ApplicationUserFilter.Phone = Role_ApplicationUserFilterDTO.Phone;
            ApplicationUserFilter.UserStatusId = Role_ApplicationUserFilterDTO.UserStatusId;

            List<ApplicationUser> ApplicationUsers = await ApplicationUserService.List(ApplicationUserFilter);
            List<Role_ApplicationUserDTO> Role_ApplicationUserDTOs = ApplicationUsers
                .Select(x => new Role_ApplicationUserDTO(x)).ToList();
            return Role_ApplicationUserDTOs;
        }
        [Route(RoleRoute.SingleListView), HttpPost]
        public async Task<List<Role_ViewDTO>> SingleListView([FromBody] Role_ViewFilterDTO Role_ViewFilterDTO)
        {
            ViewFilter ViewFilter = new ViewFilter();
            ViewFilter.Skip = 0;
            ViewFilter.Take = 20;
            ViewFilter.OrderBy = ViewOrder.Id;
            ViewFilter.OrderType = OrderType.ASC;
            ViewFilter.Selects = ViewSelect.ALL;
            ViewFilter.Id = Role_ViewFilterDTO.Id;
            ViewFilter.Name = Role_ViewFilterDTO.Name;
            ViewFilter.Path = Role_ViewFilterDTO.Path;

            List<View> Views = await ViewService.List(ViewFilter);
            List<Role_ViewDTO> Role_ViewDTOs = Views
                .Select(x => new Role_ViewDTO(x)).ToList();
            return Role_ViewDTOs;
        }

        [Route(RoleRoute.CountApplicationUser), HttpPost]
        public async Task<long> CountApplicationUser([FromBody] Role_ApplicationUserFilterDTO Role_ApplicationUserFilterDTO)
        {
            ApplicationUserFilter ApplicationUserFilter = new ApplicationUserFilter();

            return await ApplicationUserService.Count(ApplicationUserFilter);
        }

        [Route(RoleRoute.ListApplicationUser), HttpPost]
        public async Task<List<Role_ApplicationUserDTO>> ListApplicationUser([FromBody] Role_ApplicationUserFilterDTO Role_ApplicationUserFilterDTO)
        {
            ApplicationUserFilter ApplicationUserFilter = new ApplicationUserFilter();
            ApplicationUserFilter.Skip = Role_ApplicationUserFilterDTO.Skip;
            ApplicationUserFilter.Take = Role_ApplicationUserFilterDTO.Take;
            ApplicationUserFilter.OrderBy = ApplicationUserOrder.Id;
            ApplicationUserFilter.OrderType = OrderType.ASC;
            ApplicationUserFilter.Selects = ApplicationUserSelect.ALL;

            List<ApplicationUser> ApplicationUsers = await ApplicationUserService.List(ApplicationUserFilter);
            List<Role_ApplicationUserDTO> Role_ApplicationUserDTOs = ApplicationUsers
                .Select(x => new Role_ApplicationUserDTO(x)).ToList();
            return Role_ApplicationUserDTOs;
        }
    }
}

