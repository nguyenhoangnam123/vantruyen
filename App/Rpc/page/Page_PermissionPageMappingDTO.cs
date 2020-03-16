using Common;
using System;
using System.Linq;
using System.Collections.Generic;
using Portal.BE.Entities;

namespace Portal.BE.Rpc.page
{
    public class Page_PermissionPageMappingDTO : DataDTO
    {
        public long PermissionId { get; set; }
        public long PageId { get; set; }
        public Page_PermissionDTO Permission { get; set; }   
        
        public Page_PermissionPageMappingDTO() {}
        public Page_PermissionPageMappingDTO(PermissionPageMapping PermissionPageMapping)
        {
            this.PermissionId = PermissionPageMapping.PermissionId;
            this.PageId = PermissionPageMapping.PageId;
            this.Permission = PermissionPageMapping.Permission == null ? null : new Page_PermissionDTO(PermissionPageMapping.Permission);
        }
    }

    public class Page_PermissionPageMappingFilterDTO : FilterDTO
    {
        
        public IdFilter PermissionId { get; set; }
        
        public IdFilter PageId { get; set; }
        
        public PermissionPageMappingOrder OrderBy { get; set; }
    }
}