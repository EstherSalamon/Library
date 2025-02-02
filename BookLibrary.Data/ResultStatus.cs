using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookLibrary.Data
{
    public enum ResultStatus
    {
        InvalidBook,
        InvalidUser,
        UserMaxedOut,
        BookUnavailable,
        InvalidTransaction,
        Success,
        UnknownError
    }
}
