using Common;
using System;
using System.Linq;
using System.Collections.Generic;
using Portal.BE.Entities;

namespace Portal.BE.Rpc.field
{
    public class Field_PermissionFieldMappingDTO : DataDTO
    {
        public long PermissionId { get; set; }
        public long FieldId { get; set; }
        public string Value { get; set; }
        public Field_PermissionDTO Permission { get; set; }   
        
        public Field_PermissionFieldMappingDTO() {}
        public Field_PermissionFieldMappingDTO(PermissionFieldMapping PermissionFieldMapping)
        {
            this.PermissionId = PermissionFieldMapping.PermissionId;
            this.FieldId = PermissionFieldMapping.FieldId;
            this.Value = PermissionFieldMapping.Value;
            this.Permission = PermissionFieldMapping.Permission == null ? null : new Field_PermissionDTO(PermissionFieldMapping.Permission);
        }
    }

    public class Field_PermissionFieldMappingFilterDTO : FilterDTO
    {
        
        public IdFilter PermissionId { get; set; }
        
        public IdFilter FieldId { get; set; }
        
        public StringFilter Value { get; set; }
        
        public PermissionFieldMappingOrder OrderBy { get; set; }
    }
}