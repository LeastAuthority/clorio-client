import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { readSession, updateUser } from "../../tools/db";
import { GET_ID } from "../../graphql/query";
import { IWalletData } from "../../types/WalletData";
import { IWalletIdData } from "../../types/WalletIdData";
import { DEFAULT_QUERY_REFRESH_INTERVAL } from "../../tools";

interface IProps {
  sessionData: IWalletData;
}

const UserIDUpdater = ({ sessionData }: IProps) => {
  const [address, setAddress] = useState<string>("");
  const { data: userID, stopPolling } = useQuery<IWalletIdData>(GET_ID, {
    variables: { publicKey: address },
    skip: !address,
    pollInterval: DEFAULT_QUERY_REFRESH_INTERVAL,
  });

  /**
   * If wallet id is not available, set address inside the state and refetch
   */
  const setUserId = async () => {
    const walletData: IWalletData = await readSession();
    if (walletData?.id === -1) {
      if (sessionData?.address) {
        setAddress(sessionData.address);
      }
    }
  };

  useEffect(() => {
    setUserId();
    // If query returns the wallet id, set it inside the storage and clear the address inside the state.
    if (userID?.public_keys && userID?.public_keys?.length > 0) {
      updateUser(address, userID.public_keys[0].id);
      setAddress("");
      stopPolling();
    }
  });

  return <div />;
};

export default UserIDUpdater;
