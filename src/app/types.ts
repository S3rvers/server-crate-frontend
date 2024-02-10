export type LoadingStatus = {
  status: boolean;
  message: string;
  isError: boolean;
};
export type Select = {
  id: string;
  name: string;
};
export type OnChange<T> = (value: T) => void;
export type OnTouch = () => void;
export type AppState = {
  user: Omit<UserSignUp, 'password'>;
  token: string;
};
export type UserSignUp = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
export type VerifiedUser = {
    token: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  };
  export type SignIn = {
    email: string;
    password: string;
  };
  export type Username = { firstName: string; lastName: string };
  export type Success = {
    message: string;
  };
  export type Failure = {
    errorMessage: string;
  };
  export type VerificationFailure = {
    errorMessage: string;
  };
  export type Verifying = {
    isLoading: boolean;
    message: string;
    isError: boolean;
  };
  export type Verify = {
    email: string;
    code: string;
  };
  export type ResendOtp = {
    email: string;
    otpType: string;
  };
  export type OtpResend = {
    email: string;
    type: string;
  };
  export type SetOtp = {
    otp: string;
  };
  export type ResetPassword = {
    email: string;
    otpCode: string;
    newPassword: string;
    confirmNewPassword: string;
  };
  export type VerifyOtp = {
    email: string;
    otpCode: string;
  };
  export type ResetLink = {
    email: string;
  };
  export type Contact = {
    phoneNumber: string;
    country: string;
    iso2Code: string;
    dialCode: string;
  };
  export type GeneralInfo = {
    firstName: string;
    lastName: string;
    email: string;
    contact: Contact;
    role: string;
  };
  export type ChangeContact = {
    firstName: string;
    lastName: string;
    contact: Contact;
  };
  export type TokenPayload = {
    role: string;
    sub: string;
    iat: number;
    exp: number;
  };
  export type Link = {
    label: string;
    link: string;
    index: number;
  };
  export type ChangePassword = {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  };
  export type AttributeOption = {
    id: string;
    optionName: string;
    additionalInfo: AdditionalInfo;
    optionPrice: number;
    optionMedia: string;
    attribute: {
      name: string;
      id: string;
      isMeasured: boolean,
      unit: string
    },
    compatibleOptionId?: string
  }
  export type AdditionalInfo = {
    baseAmount: number;
    maxAmount: number;
    priceFactor: number;
  }
  export type CategoryEditResponse = {
    compatibleOptionId: string;
    name: string;
    type: string;
    price: number;
    media: string;
    unit: string;
    isCompatible: boolean;
    isIncluded: boolean;
    isMeasured: boolean;
    priceFactor: number;
    size: number;
    attributeId: string;
    attributeOptionId: string;
    priceIncrement: number;
    baseAmount: number;
    maxAmount: number
  }
  export type ProductItem = {
    imageUrl: string;
    coverImage: string;
    productName: string;
    productBrand: string;
    productPrice: string;
    inStock: number;
    sales: number;
    id: string;
    productId: string;
    productDescription: string;
    category: {
      id: string;
      name: string;
    }
    isFeatured: boolean
  };