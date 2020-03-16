using Common;
using System;
using System.Linq;
using System.Collections.Generic;
using Portal.BE.Entities;

namespace Portal.BE.Rpc.page
{
    public class Page_PageDTO : DataDTO
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Path { get; set; }
        public long ViewId { get; set; }
        public bool IsDeleted { get; set; }
        public Page_ViewDTO View { get; set; }
        public List<Page_PermissionPageMappingDTO> PermissionPageMappings { get; set; }
        public Page_PageDTO() {}
        public Page_PageDTO(Page Page)
        {
            this.Id = Page.Id;
            this.Name = Page.Name;
            this.Path = Page.Path;
            this.ViewId = Page.ViewId;
            this.IsDeleted = Page.IsDeleted;
            this.View = Page.View == null ? null : new Page_ViewDTO(Page.View);
            this.PermissionPageMappings = Page.PermissionPageMappings?.Select(x => new Page_PermissionPageMappingDTO(x)).ToList();
        }
    }

    public class Page_PageFilterDTO : FilterDTO
    {
        public IdFilter Id { get; set; }
        public StringFilter Name { get; set; }
        public StringFilter Path { get; set; }
        public IdFilter ViewId { get; set; }
        public PageOrder OrderBy { get; set; }
    }
}
