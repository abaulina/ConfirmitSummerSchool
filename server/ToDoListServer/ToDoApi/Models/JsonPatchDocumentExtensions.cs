using System;
using System.ComponentModel;
using System.Linq;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace ToDoApi.Models
{
    public static class JsonPatchDocumentExtensions
    {
        public static void ApplyToSafely(this JsonPatchDocument<ToDoItem> patchDoc,
            ToDoItem objectToApplyTo, IdValidator idValidator)
        {
            if (patchDoc == null) throw new ArgumentNullException(nameof(patchDoc));
            if (objectToApplyTo == null) throw new ArgumentNullException(nameof(objectToApplyTo));

            foreach (var op in patchDoc.Operations)
            {
                if (string.IsNullOrWhiteSpace(op.path)) continue;

                var segments = op.path.TrimStart('/').Split('/');
                var targetProperty = segments.First();
                switch (targetProperty)
                {
                    case "Status" when !EnumIsValid(op.value):
                        throw new InvalidEnumArgumentException();
                    case "Id": 
                    {
                        idValidator.Validate((int) op.value); 
                        break;
                    }
                }
            }

            patchDoc.ApplyTo(objectToApplyTo, new ModelStateDictionary());
        }

        private static bool EnumIsValid(object value)
        {
            return value switch
            {
                ToDoItemStatus _ => Enum.IsDefined(typeof(ToDoItemStatus), value),
                long l => Enum.IsDefined(typeof(ToDoItemStatus), (int) l),
                string s => Enum.IsDefined(typeof(ToDoItemStatus), int.Parse(s)),
                _ => false
            };
        }
    }
}
