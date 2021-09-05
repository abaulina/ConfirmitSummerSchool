using System;

namespace ToDoApi.Models
{
    public class IdValidator
    {
        private readonly ToDoList _toDoList;

        public IdValidator(ToDoList toDoList)
        {
            _toDoList = new ToDoList(toDoList);
        }

        public void Validate(int id)
        {
            if (_toDoList.Exists(t => t.Id == id))
                throw new ArgumentException("The same id already exists");
        }
    }
}
