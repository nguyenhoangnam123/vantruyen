using Common;
using System;
using System.Linq;
using System.Collections.Generic;
using Portal.BE.Entities;

namespace Portal.BE.Rpc.view
{
    public class View_FieldDTO : DataDTO
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public long ViewId { get; set; }
        public bool IsDeleted { get; set; }
        
        public View_FieldDTO() {}
        public View_FieldDTO(Field Field)
        {
            this.Id = Field.Id;
            this.Name = Field.Name;
            this.Type = Field.Type;
            this.ViewId = Field.ViewId;
            this.IsDeleted = Field.IsDeleted;
        }
    }

    public class View_FieldFilterDTO : FilterDTO
    {
        
        public IdFilter Id { get; set; }
        
        public StringFilter Name { get; set; }
        
        public StringFilter Type { get; set; }
        
        public IdFilter ViewId { get; set; }
        
        public FieldOrder OrderBy { get; set; }
    }
}