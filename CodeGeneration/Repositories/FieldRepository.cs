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
    public interface IFieldRepository
    {
        Task<int> Count(FieldFilter FieldFilter);
        Task<List<Field>> List(FieldFilter FieldFilter);
        Task<Field> Get(long Id);
        Task<bool> Create(Field Field);
        Task<bool> Update(Field Field);
        Task<bool> Delete(Field Field);
        Task<bool> BulkMerge(List<Field> Fields);
        Task<bool> BulkDelete(List<Field> Fields);
    }
    public class FieldRepository : IFieldRepository
    {
        private DataContext DataContext;
        public FieldRepository(DataContext DataContext)
        {
            this.DataContext = DataContext;
        }

        private IQueryable<FieldDAO> DynamicFilter(IQueryable<FieldDAO> query, FieldFilter filter)
        {
            if (filter == null)
                return query.Where(q => false);
            if (filter.Id != null)
                query = query.Where(q => q.Id, filter.Id);
            if (filter.Name != null)
                query = query.Where(q => q.Name, filter.Name);
            if (filter.Type != null)
                query = query.Where(q => q.Type, filter.Type);
            if (filter.ViewId != null)
                query = query.Where(q => q.ViewId, filter.ViewId);
            query = OrFilter(query, filter);
            return query;
        }

         private IQueryable<FieldDAO> OrFilter(IQueryable<FieldDAO> query, FieldFilter filter)
        {
            if (filter.OrFilter == null || filter.OrFilter.Count == 0)
                return query;
            IQueryable<FieldDAO> initQuery = query.Where(q => false);
            foreach (FieldFilter FieldFilter in filter.OrFilter)
            {
                IQueryable<FieldDAO> queryable = query;
                if (filter.Id != null)
                    queryable = queryable.Where(q => q.Id, filter.Id);
                if (filter.Name != null)
                    queryable = queryable.Where(q => q.Name, filter.Name);
                if (filter.Type != null)
                    queryable = queryable.Where(q => q.Type, filter.Type);
                if (filter.ViewId != null)
                    queryable = queryable.Where(q => q.ViewId, filter.ViewId);
                initQuery = initQuery.Union(queryable);
            }
            return initQuery;
        }    

        private IQueryable<FieldDAO> DynamicOrder(IQueryable<FieldDAO> query, FieldFilter filter)
        {
            switch (filter.OrderType)
            {
                case OrderType.ASC:
                    switch (filter.OrderBy)
                    {
                        case FieldOrder.Id:
                            query = query.OrderBy(q => q.Id);
                            break;
                        case FieldOrder.Name:
                            query = query.OrderBy(q => q.Name);
                            break;
                        case FieldOrder.Type:
                            query = query.OrderBy(q => q.Type);
                            break;
                        case FieldOrder.View:
                            query = query.OrderBy(q => q.ViewId);
                            break;
                        case FieldOrder.IsDeleted:
                            query = query.OrderBy(q => q.IsDeleted);
                            break;
                    }
                    break;
                case OrderType.DESC:
                    switch (filter.OrderBy)
                    {
                        case FieldOrder.Id:
                            query = query.OrderByDescending(q => q.Id);
                            break;
                        case FieldOrder.Name:
                            query = query.OrderByDescending(q => q.Name);
                            break;
                        case FieldOrder.Type:
                            query = query.OrderByDescending(q => q.Type);
                            break;
                        case FieldOrder.View:
                            query = query.OrderByDescending(q => q.ViewId);
                            break;
                        case FieldOrder.IsDeleted:
                            query = query.OrderByDescending(q => q.IsDeleted);
                            break;
                    }
                    break;
            }
            query = query.Skip(filter.Skip).Take(filter.Take);
            return query;
        }

        private async Task<List<Field>> DynamicSelect(IQueryable<FieldDAO> query, FieldFilter filter)
        {
            List<Field> Fields = await query.Select(q => new Field()
            {
                Id = filter.Selects.Contains(FieldSelect.Id) ? q.Id : default(long),
                Name = filter.Selects.Contains(FieldSelect.Name) ? q.Name : default(string),
                Type = filter.Selects.Contains(FieldSelect.Type) ? q.Type : default(string),
                ViewId = filter.Selects.Contains(FieldSelect.View) ? q.ViewId : default(long),
                IsDeleted = filter.Selects.Contains(FieldSelect.IsDeleted) ? q.IsDeleted : default(bool),
                View = filter.Selects.Contains(FieldSelect.View) && q.View != null ? new View
                {
                    Id = q.View.Id,
                    Name = q.View.Name,
                    Path = q.View.Path,
                    IsDeleted = q.View.IsDeleted,
                } : null,
            }).ToListAsync();
            return Fields;
        }

        public async Task<int> Count(FieldFilter filter)
        {
            IQueryable<FieldDAO> Fields = DataContext.Field;
            Fields = DynamicFilter(Fields, filter);
            return await Fields.CountAsync();
        }

        public async Task<List<Field>> List(FieldFilter filter)
        {
            if (filter == null) return new List<Field>();
            IQueryable<FieldDAO> FieldDAOs = DataContext.Field;
            FieldDAOs = DynamicFilter(FieldDAOs, filter);
            FieldDAOs = DynamicOrder(FieldDAOs, filter);
            List<Field> Fields = await DynamicSelect(FieldDAOs, filter);
            return Fields;
        }

        public async Task<Field> Get(long Id)
        {
            Field Field = await DataContext.Field.Where(x => x.Id == Id).Select(x => new Field()
            {
                Id = x.Id,
                Name = x.Name,
                Type = x.Type,
                ViewId = x.ViewId,
                IsDeleted = x.IsDeleted,
                View = x.View == null ? null : new View
                {
                    Id = x.View.Id,
                    Name = x.View.Name,
                    Path = x.View.Path,
                    IsDeleted = x.View.IsDeleted,
                },
            }).FirstOrDefaultAsync();

            if (Field == null)
                return null;
            Field.PermissionFieldMappings = await DataContext.PermissionFieldMapping
                .Where(x => x.FieldId == Field.Id)
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
                    },
                }).ToListAsync();

            return Field;
        }
        public async Task<bool> Create(Field Field)
        {
            FieldDAO FieldDAO = new FieldDAO();
            FieldDAO.Id = Field.Id;
            FieldDAO.Name = Field.Name;
            FieldDAO.Type = Field.Type;
            FieldDAO.ViewId = Field.ViewId;
            FieldDAO.IsDeleted = Field.IsDeleted;
            DataContext.Field.Add(FieldDAO);
            await DataContext.SaveChangesAsync();
            Field.Id = FieldDAO.Id;
            await SaveReference(Field);
            return true;
        }

        public async Task<bool> Update(Field Field)
        {
            FieldDAO FieldDAO = DataContext.Field.Where(x => x.Id == Field.Id).FirstOrDefault();
            if (FieldDAO == null)
                return false;
            FieldDAO.Id = Field.Id;
            FieldDAO.Name = Field.Name;
            FieldDAO.Type = Field.Type;
            FieldDAO.ViewId = Field.ViewId;
            FieldDAO.IsDeleted = Field.IsDeleted;
            await DataContext.SaveChangesAsync();
            await SaveReference(Field);
            return true;
        }

        public async Task<bool> Delete(Field Field)
        {
            
            
            
            
            
            
            
            await DataContext.PermissionFieldMapping.Where(x => x.FieldId == Field.Id).DeleteFromQueryAsync();


            await DataContext.Field.Where(x => x.Id == Field.Id).DeleteFromQueryAsync();
            return true;
        }
        
        public async Task<bool> BulkMerge(List<Field> Fields)
        {
            List<FieldDAO> FieldDAOs = new List<FieldDAO>();
            foreach (Field Field in Fields)
            {
                FieldDAO FieldDAO = new FieldDAO();
                FieldDAO.Id = Field.Id;
                FieldDAO.Name = Field.Name;
                FieldDAO.Type = Field.Type;
                FieldDAO.ViewId = Field.ViewId;
                FieldDAO.IsDeleted = Field.IsDeleted;
                FieldDAOs.Add(FieldDAO);
            }
            await DataContext.BulkMergeAsync(FieldDAOs);
            return true;
        }

        public async Task<bool> BulkDelete(List<Field> Fields)
        {
            List<long> Ids = Fields.Select(x => x.Id).ToList();
            await DataContext.PermissionFieldMapping.Where(x => Ids.Contains(x.FieldId)).DeleteFromQueryAsync();
            await DataContext.Field.Where(x => Ids.Contains(x.Id)).DeleteFromQueryAsync();
            return true;
        }

        private async Task SaveReference(Field Field)
        {
            await DataContext.PermissionFieldMapping
                .Where(x => x.FieldId == Field.Id)
                .DeleteFromQueryAsync();
            List<PermissionFieldMappingDAO> PermissionFieldMappingDAOs = new List<PermissionFieldMappingDAO>();
            if (Field.PermissionFieldMappings != null)
            {
                foreach (PermissionFieldMapping PermissionFieldMapping in Field.PermissionFieldMappings)
                {
                    PermissionFieldMappingDAO PermissionFieldMappingDAO = new PermissionFieldMappingDAO();
                    PermissionFieldMappingDAO.PermissionId = PermissionFieldMapping.PermissionId;
                    PermissionFieldMappingDAO.FieldId = PermissionFieldMapping.FieldId;
                    PermissionFieldMappingDAO.Value = PermissionFieldMapping.Value;
                    PermissionFieldMappingDAOs.Add(PermissionFieldMappingDAO);
                }
                await DataContext.PermissionFieldMapping.BulkMergeAsync(PermissionFieldMappingDAOs);
            }
        }
        
    }
}
