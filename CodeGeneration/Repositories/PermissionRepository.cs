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
    public interface IPermissionRepository
    {
        Task<int> Count(PermissionFilter PermissionFilter);
        Task<List<Permission>> List(PermissionFilter PermissionFilter);
        Task<Permission> Get(long Id);
        Task<bool> Create(Permission Permission);
        Task<bool> Update(Permission Permission);
        Task<bool> Delete(Permission Permission);
        Task<bool> BulkMerge(List<Permission> Permissions);
        Task<bool> BulkDelete(List<Permission> Permissions);
    }
    public class PermissionRepository : IPermissionRepository
    {
        private DataContext DataContext;
        public PermissionRepository(DataContext DataContext)
        {
            this.DataContext = DataContext;
        }

        private IQueryable<PermissionDAO> DynamicFilter(IQueryable<PermissionDAO> query, PermissionFilter filter)
        {
            if (filter == null)
                return query.Where(q => false);
            if (filter.Id != null)
                query = query.Where(q => q.Id, filter.Id);
            if (filter.Name != null)
                query = query.Where(q => q.Name, filter.Name);
            if (filter.RoleId != null)
                query = query.Where(q => q.RoleId, filter.RoleId);
            if (filter.ViewId != null)
                query = query.Where(q => q.ViewId, filter.ViewId);
            query = OrFilter(query, filter);
            return query;
        }

         private IQueryable<PermissionDAO> OrFilter(IQueryable<PermissionDAO> query, PermissionFilter filter)
        {
            if (filter.OrFilter == null || filter.OrFilter.Count == 0)
                return query;
            IQueryable<PermissionDAO> initQuery = query.Where(q => false);
            foreach (PermissionFilter PermissionFilter in filter.OrFilter)
            {
                IQueryable<PermissionDAO> queryable = query;
                if (filter.Id != null)
                    queryable = queryable.Where(q => q.Id, filter.Id);
                if (filter.Name != null)
                    queryable = queryable.Where(q => q.Name, filter.Name);
                if (filter.RoleId != null)
                    queryable = queryable.Where(q => q.RoleId, filter.RoleId);
                if (filter.ViewId != null)
                    queryable = queryable.Where(q => q.ViewId, filter.ViewId);
                initQuery = initQuery.Union(queryable);
            }
            return initQuery;
        }    

        private IQueryable<PermissionDAO> DynamicOrder(IQueryable<PermissionDAO> query, PermissionFilter filter)
        {
            switch (filter.OrderType)
            {
                case OrderType.ASC:
                    switch (filter.OrderBy)
                    {
                        case PermissionOrder.Id:
                            query = query.OrderBy(q => q.Id);
                            break;
                        case PermissionOrder.Name:
                            query = query.OrderBy(q => q.Name);
                            break;
                        case PermissionOrder.Role:
                            query = query.OrderBy(q => q.RoleId);
                            break;
                        case PermissionOrder.View:
                            query = query.OrderBy(q => q.ViewId);
                            break;
                    }
                    break;
                case OrderType.DESC:
                    switch (filter.OrderBy)
                    {
                        case PermissionOrder.Id:
                            query = query.OrderByDescending(q => q.Id);
                            break;
                        case PermissionOrder.Name:
                            query = query.OrderByDescending(q => q.Name);
                            break;
                        case PermissionOrder.Role:
                            query = query.OrderByDescending(q => q.RoleId);
                            break;
                        case PermissionOrder.View:
                            query = query.OrderByDescending(q => q.ViewId);
                            break;
                    }
                    break;
            }
            query = query.Skip(filter.Skip).Take(filter.Take);
            return query;
        }

        private async Task<List<Permission>> DynamicSelect(IQueryable<PermissionDAO> query, PermissionFilter filter)
        {
            List<Permission> Permissions = await query.Select(q => new Permission()
            {
                Id = filter.Selects.Contains(PermissionSelect.Id) ? q.Id : default(long),
                Name = filter.Selects.Contains(PermissionSelect.Name) ? q.Name : default(string),
                RoleId = filter.Selects.Contains(PermissionSelect.Role) ? q.RoleId : default(long),
                ViewId = filter.Selects.Contains(PermissionSelect.View) ? q.ViewId : default(long),
                Role = filter.Selects.Contains(PermissionSelect.Role) && q.Role != null ? new Role
                {
                    Id = q.Role.Id,
                    Name = q.Role.Name,
                } : null,
                View = filter.Selects.Contains(PermissionSelect.View) && q.View != null ? new View
                {
                    Id = q.View.Id,
                    Name = q.View.Name,
                    Path = q.View.Path,
                    IsDeleted = q.View.IsDeleted,
                } : null,
            }).ToListAsync();
            return Permissions;
        }

        public async Task<int> Count(PermissionFilter filter)
        {
            IQueryable<PermissionDAO> Permissions = DataContext.Permission;
            Permissions = DynamicFilter(Permissions, filter);
            return await Permissions.CountAsync();
        }

        public async Task<List<Permission>> List(PermissionFilter filter)
        {
            if (filter == null) return new List<Permission>();
            IQueryable<PermissionDAO> PermissionDAOs = DataContext.Permission;
            PermissionDAOs = DynamicFilter(PermissionDAOs, filter);
            PermissionDAOs = DynamicOrder(PermissionDAOs, filter);
            List<Permission> Permissions = await DynamicSelect(PermissionDAOs, filter);
            return Permissions;
        }

        public async Task<Permission> Get(long Id)
        {
            Permission Permission = await DataContext.Permission.Where(x => x.Id == Id).Select(x => new Permission()
            {
                Id = x.Id,
                Name = x.Name,
                RoleId = x.RoleId,
                ViewId = x.ViewId,
                Role = x.Role == null ? null : new Role
                {
                    Id = x.Role.Id,
                    Name = x.Role.Name,
                },
                View = x.View == null ? null : new View
                {
                    Id = x.View.Id,
                    Name = x.View.Name,
                    Path = x.View.Path,
                    IsDeleted = x.View.IsDeleted,
                },
            }).FirstOrDefaultAsync();

            if (Permission == null)
                return null;
            Permission.PermissionFieldMappings = await DataContext.PermissionFieldMapping
                .Where(x => x.PermissionId == Permission.Id)
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
                    },
                }).ToListAsync();
            Permission.PermissionPageMappings = await DataContext.PermissionPageMapping
                .Where(x => x.PermissionId == Permission.Id)
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
                    },
                }).ToListAsync();

            return Permission;
        }
        public async Task<bool> Create(Permission Permission)
        {
            PermissionDAO PermissionDAO = new PermissionDAO();
            PermissionDAO.Id = Permission.Id;
            PermissionDAO.Name = Permission.Name;
            PermissionDAO.RoleId = Permission.RoleId;
            PermissionDAO.ViewId = Permission.ViewId;
            DataContext.Permission.Add(PermissionDAO);
            await DataContext.SaveChangesAsync();
            Permission.Id = PermissionDAO.Id;
            await SaveReference(Permission);
            return true;
        }

        public async Task<bool> Update(Permission Permission)
        {
            PermissionDAO PermissionDAO = DataContext.Permission.Where(x => x.Id == Permission.Id).FirstOrDefault();
            if (PermissionDAO == null)
                return false;
            PermissionDAO.Id = Permission.Id;
            PermissionDAO.Name = Permission.Name;
            PermissionDAO.RoleId = Permission.RoleId;
            PermissionDAO.ViewId = Permission.ViewId;
            await DataContext.SaveChangesAsync();
            await SaveReference(Permission);
            return true;
        }

        public async Task<bool> Delete(Permission Permission)
        {
            
            
            
            
            
            
            
            await DataContext.PermissionFieldMapping.Where(x => x.PermissionId == Permission.Id).DeleteFromQueryAsync();

            
            await DataContext.PermissionPageMapping.Where(x => x.PermissionId == Permission.Id).DeleteFromQueryAsync();


            await DataContext.Permission.Where(x => x.Id == Permission.Id).DeleteFromQueryAsync();
            return true;
        }
        
        public async Task<bool> BulkMerge(List<Permission> Permissions)
        {
            List<PermissionDAO> PermissionDAOs = new List<PermissionDAO>();
            foreach (Permission Permission in Permissions)
            {
                PermissionDAO PermissionDAO = new PermissionDAO();
                PermissionDAO.Id = Permission.Id;
                PermissionDAO.Name = Permission.Name;
                PermissionDAO.RoleId = Permission.RoleId;
                PermissionDAO.ViewId = Permission.ViewId;
                PermissionDAOs.Add(PermissionDAO);
            }
            await DataContext.BulkMergeAsync(PermissionDAOs);
            return true;
        }

        public async Task<bool> BulkDelete(List<Permission> Permissions)
        {
            List<long> Ids = Permissions.Select(x => x.Id).ToList();
            await DataContext.PermissionFieldMapping.Where(x => Ids.Contains(x.PermissionId)).DeleteFromQueryAsync();
            await DataContext.PermissionPageMapping.Where(x => Ids.Contains(x.PermissionId)).DeleteFromQueryAsync();
            await DataContext.Permission.Where(x => Ids.Contains(x.Id)).DeleteFromQueryAsync();
            return true;
        }

        private async Task SaveReference(Permission Permission)
        {
            await DataContext.PermissionFieldMapping
                .Where(x => x.PermissionId == Permission.Id)
                .DeleteFromQueryAsync();
            List<PermissionFieldMappingDAO> PermissionFieldMappingDAOs = new List<PermissionFieldMappingDAO>();
            if (Permission.PermissionFieldMappings != null)
            {
                foreach (PermissionFieldMapping PermissionFieldMapping in Permission.PermissionFieldMappings)
                {
                    PermissionFieldMappingDAO PermissionFieldMappingDAO = new PermissionFieldMappingDAO();
                    PermissionFieldMappingDAO.PermissionId = PermissionFieldMapping.PermissionId;
                    PermissionFieldMappingDAO.FieldId = PermissionFieldMapping.FieldId;
                    PermissionFieldMappingDAO.Value = PermissionFieldMapping.Value;
                    PermissionFieldMappingDAOs.Add(PermissionFieldMappingDAO);
                }
                await DataContext.PermissionFieldMapping.BulkMergeAsync(PermissionFieldMappingDAOs);
            }
            await DataContext.PermissionPageMapping
                .Where(x => x.PermissionId == Permission.Id)
                .DeleteFromQueryAsync();
            List<PermissionPageMappingDAO> PermissionPageMappingDAOs = new List<PermissionPageMappingDAO>();
            if (Permission.PermissionPageMappings != null)
            {
                foreach (PermissionPageMapping PermissionPageMapping in Permission.PermissionPageMappings)
                {
                    PermissionPageMappingDAO PermissionPageMappingDAO = new PermissionPageMappingDAO();
                    PermissionPageMappingDAO.PermissionId = PermissionPageMapping.PermissionId;
                    PermissionPageMappingDAO.PageId = PermissionPageMapping.PageId;
                    PermissionPageMappingDAOs.Add(PermissionPageMappingDAO);
                }
                await DataContext.PermissionPageMapping.BulkMergeAsync(PermissionPageMappingDAOs);
            }
        }
        
    }
}
