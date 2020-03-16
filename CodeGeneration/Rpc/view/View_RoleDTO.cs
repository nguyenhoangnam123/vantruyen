using Common;
using System;
using System.Linq;
using System.Collections.Generic;
using Portal.BE.Entities;

namespace Portal.BE.Rpc.view
{
    public class View_RoleDTO : DataDTO
    {
        
        public long Id { get; set; }
        
        public string Name { get; set; }
        

        public View_RoleDTO() {}
        public View_RoleDTO(Role Role)
        {
            
            this.Id = Role.Id;
            
            this.Name = Role.Name;
            
        }
    }

    public class View_RoleFilterDTO : FilterDTO
    {
        
        public IdFilter Id { get; set; }
        
        public StringFilter Name { get; set; }
        
        public RoleOrder OrderBy { get; set; }
    }
}