using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirBnb.Core.Shared.Configurations
{
     public class HangFireSettings
    {

        public string Route { get; set; }
        public string  ServerName { get; set; }
        public DatabaseSettings Storage { get; set; }
        public Dashboard Dashboard { get; set; }

    }
    public class Dashboard
    {
        public string AppPath { get; set; }
        public int StatsPollingInterval { get; set; }
        public string DashboardTitle { get; set; }
    }
}
