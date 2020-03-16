using Common;
using System;
using System.Linq;
using System.Collections.Generic;
using Portal.BE.Entities;

namespace Portal.BE.Rpc.permission
{
    public class Permission_ViewDTO : DataDTO
    {
        
        public long Id { get; set; }
        
        public string Name { get; set; }
        
        public string Path { get; set; }
        
        public bool IsDeleted { get; set; }
        

        public Permission_ViewDTO() {}
        public Permission_ViewDTO(View View)
        {
            
            this.Id = View.Id;
            
            this.Name = View.Name;
            
            this.Path = View.Path;
            
            this.IsDeleted = View.IsDeleted;
            
        }
    }

    public class Permission_ViewFilterDTO : FilterDTO
    {
        
        public IdFilter Id { get; set; }
        
        public StringFilter Name { get; set; }
        
        public StringFilter Path { get; set; }
        
        public ViewOrder OrderBy { get; set; }
    }
}