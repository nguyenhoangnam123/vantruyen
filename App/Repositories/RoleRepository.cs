using Common;
using Portal.BE.Entities;
using Portal.BE.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Helpers;

namespace Portal.BE.Repositories
{
    public interface IRoleRepository
    {
        Task<int> Count(RoleFilter RoleFilter);
        Task<List<Role>> List(RoleFilter RoleFilter);
        Task<Role> Get(long Id);
        Task<bool> Create(Role Role);
        Task<bool> Update(Role Role);
        Task<bool> Delete(Role Role);
        Task<bool> BulkMerge(List<Role> Roles);
        Task<bool> BulkDelete(List<Role> Roles);
    }
    public class RoleRepository : IRoleRepository
    {
        private DataContext DataContext;
        public RoleRepository(DataContext DataContext)
        {
            this.DataContext = DataContext;
        }

        private IQueryable<RoleDAO> DynamicFilter(IQueryable<RoleDAO> query, RoleFilter filter)
        {
            if (filter == null)
                return query.Where(q => false);
            if (filter.Id != null)
                query = query.Where(q => q.Id, filter.Id);
            if (filter.Name != null)
                query = query.Where(q => q.Name, filter.Name);
            query = OrFilter(query, filter);
            return query;
        }

         private IQueryable<RoleDAO> OrFilter(IQueryable<RoleDAO> query, RoleFilter filter)
        {
            if (filter.OrFilter == null || filter.OrFilter.Count == 0)
                return query;
            IQueryable<RoleDAO> initQuery = query.Where(q => false);
            foreach (RoleFilter RoleFilter in filter.OrFilter)
            {
                IQueryable<RoleDAO> queryable = query;
                if (filter.Id != null)
                    queryable = queryable.Where(q => q.Id, filter.Id);
                if (filter.Name != null)
                    queryable = queryable.Where(q => q.Name, filter.Name);
                initQuery = initQuery.Union(queryable);
            }
            return initQuery;
        }    

        private IQueryable<RoleDAO> DynamicOrder(IQueryable<RoleDAO> query, RoleFilter filter)
        {
            switch (filter.OrderType)
            {
                case OrderType.ASC:
                    switch (filter.OrderBy)
                    {
                        case RoleOrder.Id:
                            query = query.OrderBy(q => q.Id);
                            break;
                        case RoleOrder.Name:
                            query = query.OrderBy(q => q.Name);
                            break;
                    }
                    break;
                case OrderType.DESC:
                    switch (filter.OrderBy)
                    {
                        case RoleOrder.Id:
                            query = query.OrderByDescending(q => q.Id);
                            break;
                        case RoleOrder.Name:
                            query = query.OrderByDescending(q => q.Name);
                            break;
                    }
                    break;
            }
            query = query.Skip(filter.Skip).Take(filter.Take);
            return query;
        }

        private async Task<List<Role>> DynamicSelect(IQueryable<RoleDAO> query, RoleFilter filter)
        {
            List<Role> Roles = await query.Select(q => new Role()
            {
                Id = filter.Selects.Contains(RoleSelect.Id) ? q.Id : default(long),
                Name = filter.Selects.Contains(RoleSelect.Name) ? q.Name : default(string),
            }).ToListAsync();
            return Roles;
        }

        public async Task<int> Count(RoleFilter filter)
        {
            IQueryable<RoleDAO> Roles = DataContext.Role;
            Roles = DynamicFilter(Roles, filter);
            return await Roles.CountAsync();
        }

        public async Task<List<Role>> List(RoleFilter filter)
        {
            if (filter == null) return new List<Role>();
            IQueryable<RoleDAO> RoleDAOs = DataContext.Role;
            RoleDAOs = DynamicFilter(RoleDAOs, filter);
            RoleDAOs = DynamicOrder(RoleDAOs, filter);
            List<Role> Roles = await DynamicSelect(RoleDAOs, filter);
            return Roles;
        }

        public async Task<Role> Get(long Id)
        {
            Role Role = await DataContext.Role.Where(x => x.Id == Id).Select(x => new Role()
            {
                Id = x.Id,
                Name = x.Name,
            }).FirstOrDefaultAsync();

            if (Role == null)
                return null;
            Role.ApplicationUserRoleMappings = await DataContext.ApplicationUserRoleMapping
                .Where(x => x.RoleId == Role.Id)
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
                    },
                }).ToListAsync();
            Role.Permissions = await DataContext.Permission
                .Where(x => x.RoleId == Role.Id)
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
                    },
                }).ToListAsync();

            return Role;
        }
        public async Task<bool> Create(Role Role)
        {
            RoleDAO RoleDAO = new RoleDAO();
            RoleDAO.Id = Role.Id;
            RoleDAO.Name = Role.Name;
            DataContext.Role.Add(RoleDAO);
            await DataContext.SaveChangesAsync();
            Role.Id = RoleDAO.Id;
            await SaveReference(Role);
            return true;
        }

        public async Task<bool> Update(Role Role)
        {
            RoleDAO RoleDAO = DataContext.Role.Where(x => x.Id == Role.Id).FirstOrDefault();
            if (RoleDAO == null)
                return false;
            RoleDAO.Id = Role.Id;
            RoleDAO.Name = Role.Name;
            await DataContext.SaveChangesAsync();
            await SaveReference(Role);
            return true;
        }

        public async Task<bool> Delete(Role Role)
        {
            
            
            
            await DataContext.ApplicationUserRoleMapping.Where(x => x.RoleId == Role.Id).DeleteFromQueryAsync();

                        await DataContext.Permission.Where(x => x.RoleId == Role.Id).DeleteFromQueryAsync();
            

            await DataContext.Role.Where(x => x.Id == Role.Id).DeleteFromQueryAsync();
            return true;
        }
        
        public async Task<bool> BulkMerge(List<Role> Roles)
        {
            List<RoleDAO> RoleDAOs = new List<RoleDAO>();
            foreach (Role Role in Roles)
            {
                RoleDAO RoleDAO = new RoleDAO();
                RoleDAO.Id = Role.Id;
                RoleDAO.Name = Role.Name;
                RoleDAOs.Add(RoleDAO);
            }
            await DataContext.BulkMergeAsync(RoleDAOs);
            return true;
        }

        public async Task<bool> BulkDelete(List<Role> Roles)
        {
            List<long> Ids = Roles.Select(x => x.Id).ToList();
            await DataContext.ApplicationUserRoleMapping.Where(x => Ids.Contains(x.RoleId)).DeleteFromQueryAsync();
            await DataContext.Permission.Where(x => Ids.Contains(x.RoleId)).DeleteFromQueryAsync();
            await DataContext.Role.Where(x => Ids.Contains(x.Id)).DeleteFromQueryAsync();
            return true;
        }

        private async Task SaveReference(Role Role)
        {
            await DataContext.ApplicationUserRoleMapping
                .Where(x => x.RoleId == Role.Id)
                .DeleteFromQueryAsync();
            List<ApplicationUserRoleMappingDAO> ApplicationUserRoleMappingDAOs = new List<ApplicationUserRoleMappingDAO>();
            if (Role.ApplicationUserRoleMappings != null)
            {
                foreach (ApplicationUserRoleMapping ApplicationUserRoleMapping in Role.ApplicationUserRoleMappings)
                {
                    ApplicationUserRoleMappingDAO ApplicationUserRoleMappingDAO = new ApplicationUserRoleMappingDAO();
                    ApplicationUserRoleMappingDAO.ApplicationUserId = ApplicationUserRoleMapping.ApplicationUserId;
                    ApplicationUserRoleMappingDAO.RoleId = ApplicationUserRoleMapping.RoleId;
                    ApplicationUserRoleMappingDAOs.Add(ApplicationUserRoleMappingDAO);
                }
                await DataContext.ApplicationUserRoleMapping.BulkMergeAsync(ApplicationUserRoleMappingDAOs);
            }
            await DataContext.Permission
                .Where(x => x.RoleId == Role.Id)
                .DeleteFromQueryAsync();
            List<PermissionDAO> PermissionDAOs = new List<PermissionDAO>();
            if (Role.Permissions != null)
            {
                foreach (Permission Permission in Role.Permissions)
                {
                    PermissionDAO PermissionDAO = new PermissionDAO();
                    PermissionDAO.Id = Permission.Id;
                    PermissionDAO.Name = Permission.Name;
                    PermissionDAO.RoleId = Permission.RoleId;
                    PermissionDAO.ViewId = Permission.ViewId;
                    PermissionDAOs.Add(PermissionDAO);
                }
                await DataContext.Permission.BulkMergeAsync(PermissionDAOs);
            }
        }
        
    }
}
