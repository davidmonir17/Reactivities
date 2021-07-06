namespace Application.Core
{
    public class pagingParms
    {
        private const int Max_PageSize=50;
        public int PageNumber { get; set; }=1;
        private int _pageSize=10;
        public int pageSize
        {
            get=>_pageSize;
            set =>_pageSize=(value>Max_PageSize)?Max_PageSize:value;
        }
        
    }
}