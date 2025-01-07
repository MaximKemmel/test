import React, { useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NATIVE_TOKEN_ADDRESS, useBalance } from "@thirdweb-dev/react";
import { CONFIG } from "@/lib/config";

const contractAddressUSDT = CONFIG.contractUSDT;
const contractAddressDT1 = CONFIG.contractDT1;
const contractAddressBNB = NATIVE_TOKEN_ADDRESS;

type WALLET = "USDT" | "BNB" | "CTG";

const BalanceWallet = () => {
  const { data: USDT } = useBalance(contractAddressUSDT);
  const { data: BNB } = useBalance(contractAddressBNB);
  const { data: DT1 } = useBalance(contractAddressDT1);

  const handleChangeWallet = () => {};

  const getBalance = useCallback(
    (wallet: WALLET) => {
      switch (wallet) {
        case "BNB": {
          return Number(BNB?.displayValue).toFixed(3);
        }
        case "USDT": {
          return Number(USDT?.displayValue).toFixed(0);
        }
        case "CTG": {
          return Number(DT1?.displayValue).toFixed(0);
        }
        default: {
          return "";
        }
      }
    },
    [DT1, USDT, BNB]
  );

  return (
    <Select defaultValue={"USDT"} onValueChange={handleChangeWallet}>
      <SelectTrigger
        className={
          "bg-transparent border-0 !h-[26px] !flex !items-center p-0 text-[20px] xs:text-[16px] !justify-end xs:text-white xs:h-auto uppercase text-[#BCBCBC]"
        }
      >
        <SelectValue className="flex items-center" placeholder="Баланс" />
      </SelectTrigger>
      <SelectContent className="">
        {["USDT", "BNB", "CTG"].map((wallet) => (
          <SelectItem className="flex items-center" value={wallet} key={wallet}>
            <div className="flex items-center gap-2.5">
              <div className="uppercase flex items-center gap-1 text-white">
                <span>{getBalance(wallet as WALLET)}</span>{" "}
                <span>{wallet}</span>
              </div>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default BalanceWallet;
