using Common;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using Portal.BE.Models;
using Portal.BE.Repositories;

namespace Portal.BE.Repositories
{
    public interface IUOW : IServiceScoped
    {
        Task Begin();
        Task Commit();
        Task Rollback();

        IApplicationUserRepository ApplicationUserRepository { get; }
        IFieldRepository FieldRepository { get; }
        IPageRepository PageRepository { get; }
        IPermissionRepository PermissionRepository { get; }
        IProviderRepository ProviderRepository { get; }
        IRoleRepository RoleRepository { get; }
        ISiteRepository SiteRepository { get; }
        IUserStatusRepository UserStatusRepository { get; }
        IViewRepository ViewRepository { get; }
    }

    public class UOW : IUOW
    {
        private DataContext DataContext;

        public IApplicationUserRepository ApplicationUserRepository { get; private set; }
        public IFieldRepository FieldRepository { get; private set; }
        public IPageRepository PageRepository { get; private set; }
        public IPermissionRepository PermissionRepository { get; private set; }
        public IProviderRepository ProviderRepository { get; private set; }
        public IRoleRepository RoleRepository { get; private set; }
        public ISiteRepository SiteRepository { get; private set; }
        public IUserStatusRepository UserStatusRepository { get; private set; }
        public IViewRepository ViewRepository { get; private set; }

        public UOW(DataContext DataContext)
        {
            this.DataContext = DataContext;

            ApplicationUserRepository = new ApplicationUserRepository(DataContext);
            FieldRepository = new FieldRepository(DataContext);
            PageRepository = new PageRepository(DataContext);
            PermissionRepository = new PermissionRepository(DataContext);
            ProviderRepository = new ProviderRepository(DataContext);
            RoleRepository = new RoleRepository(DataContext);
            SiteRepository = new SiteRepository(DataContext);
            UserStatusRepository = new UserStatusRepository(DataContext);
            ViewRepository = new ViewRepository(DataContext);
        }
        public async Task Begin()
        {
            await DataContext.Database.BeginTransactionAsync();
        }

        public Task Commit()
        {
            DataContext.Database.CommitTransaction();
            return Task.CompletedTask;
        }

        public Task Rollback()
        {
            DataContext.Database.RollbackTransaction();
            return Task.CompletedTask;
        }
    }
}