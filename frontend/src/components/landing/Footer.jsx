import { Link } from "react-router";

export default function Footer() {
    return (
        <footer className="bg-gray-100 py-8 mt-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between">
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">
                            HospitalQ
                        </h3>
                        <p className="text-gray-600">
                            Streamlining hospital bed management and patient
                            care.
                        </p>
                    </div>
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h4 className="text-lg font-semibold text-gray-800 mb-4">
                            Quick Links
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="#features"
                                    className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
                                >
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#for-patients"
                                    className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
                                >
                                    For Patients
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#for-hospitals"
                                    className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
                                >
                                    For Hospitals
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full md:w-1/3">
                        <h4 className="text-lg font-semibold text-gray-800 mb-4">
                            Contact Us
                        </h4>
                        <p className="text-gray-600 mb-2">
                            Email: info@hospitalq.com
                        </p>
                        <p className="text-gray-600">Phone: (123) 456-7890</p>
                    </div>
                </div>
                <div className="border-t border-gray-200 mt-8 pt-6 text-center">
                    <p className="text-gray-600">
                        &copy; {new Date().getFullYear()} HospitalQ. All rights
                        reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
