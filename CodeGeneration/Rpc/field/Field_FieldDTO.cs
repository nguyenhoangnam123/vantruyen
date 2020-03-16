using Common;
using System;
using System.Linq;
using System.Collections.Generic;
using Portal.BE.Entities;

namespace Portal.BE.Rpc.field
{
    public class Field_FieldDTO : DataDTO
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public long ViewId { get; set; }
        public bool IsDeleted { get; set; }
        public Field_ViewDTO View { get; set; }
        public List<Field_PermissionFieldMappingDTO> PermissionFieldMappings { get; set; }
        public Field_FieldDTO() {}
        public Field_FieldDTO(Field Field)
        {
            this.Id = Field.Id;
            this.Name = Field.Name;
            this.Type = Field.Type;
            this.ViewId = Field.ViewId;
            this.IsDeleted = Field.IsDeleted;
            this.View = Field.View == null ? null : new Field_ViewDTO(Field.View);
            this.PermissionFieldMappings = Field.PermissionFieldMappings?.Select(x => new Field_PermissionFieldMappingDTO(x)).ToList();
        }
    }

    public class Field_FieldFilterDTO : FilterDTO
    {
        public IdFilter Id { get; set; }
        public StringFilter Name { get; set; }
        public StringFilter Type { get; set; }
        public IdFilter ViewId { get; set; }
        public FieldOrder OrderBy { get; set; }
    }
}
