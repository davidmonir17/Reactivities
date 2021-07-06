namespace Application.Core
{
    public class AppException
    {
        private int statusCode;
        private string v;

        public AppException(int statusCode, string v)
        {
            this.statusCode = statusCode;
            this.v = v;
        }

        public AppException(int statuesCode,string message,string details = null)
                            
        {
            StatuesCode = statuesCode;
            Message = message;
            Details = details;
            
        }

        public int StatuesCode { get; set; }
        public string Message { get; set; }
        public string  Details { get; set; }
       


    }

}