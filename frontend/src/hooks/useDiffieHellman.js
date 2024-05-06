import { useState } from "react";
import toast from "react-hot-toast";

const useDiffieHellman = () => {
	const [loading, setLoading] = useState(false);

	const sendPublicKey = async () => {
		setLoading(true);
		const publicKey = crypto.getDiffieHellman("modp15");
        publicKey.generateKeys();

		try {
			const res = await fetch(`/api/sharePublicKey`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ 
					message: publicKey.getPublicKey(), 
				}),
			});

			let data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

			const secret = publicKey.computeSecret(data['publicKey'], null, 'hex');
            
            return secret;
			

		} catch (error) {
			toast.error(error.message);

		} finally {
			setLoading(false);

		}
	};
    
    return sendPublicKey;
};

export default useDiffieHellman;

