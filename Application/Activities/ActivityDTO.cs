using System;
using System.Collections;
using System.Collections.Generic;
using Application.Profiles;

namespace Application.Activities
{
    public class ActivityDTO
    {
        public Guid id { get; set; }

        public string Title { get; set; }

        public DateTime Date { get; set; }

        public string Description { get; set; }

        public string Category { get; set; }

        public string City { get; set; }

        public string Venue { get; set; }
        public string HostUsername { get; set; }
        public bool ISCancelled { get; set; }

        public ICollection<AttendeeDto> attendence { get; set; }
    }
}