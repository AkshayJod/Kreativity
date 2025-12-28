import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';
import { useForm, useFieldArray } from 'react-hook-form';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users, User, Mail, Phone, School, Check,
    ChevronRight, ChevronLeft, CreditCard, ShieldCheck,
    Trophy, Info, ArrowRight, Building2, GraduationCap
} from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import { mockCompetitions } from '../data/mockCompetitions';

const CompetitionRegister = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [competition, setCompetition] = useState(null);
    const [step, setStep] = useState(1);
    const [registrationType, setRegistrationType] = useState(null); // 'student' or 'school'
    const [loading, setLoading] = useState(true);

    const { register, control, handleSubmit, trigger, watch, formState: { errors }, reset } = useForm({
        defaultValues: {
            teamMembers: [{ name: '', grade: '', school: '', role: 'Team Lead' }],
            bulkStudents: [{ name: '', grade: '', email: '', phone: '', parentName: '', parentEmail: '', parentPhone: '' }]
        }
    });

    const { fields: teamMemberFields, append: appendTeamMember, remove: removeTeamMember } = useFieldArray({
        control,
        name: "teamMembers"
    });

    const { fields: bulkStudentFields, append: appendBulkStudent, remove: removeBulkStudent } = useFieldArray({
        control,
        name: "bulkStudents"
    });

    const formData = watch();

    useEffect(() => {
        const fetchCompetition = async () => {
            try {
                const mockComp = mockCompetitions.find(c => c._id === id);
                if (mockComp) {
                    setCompetition(mockComp);
                } else {
                    const { data } = await api.get(`/competitions/${id}`);
                    setCompetition(data);
                }
                setLoading(false);
            } catch (error) {
                console.error("Failed to load competition details", error);
                const mockComp = mockCompetitions.find(c => c._id === id);
                if (mockComp) setCompetition(mockComp);
                setLoading(false);
            }
        };
        fetchCompetition();
    }, [id]);

    const selectRegistrationType = (type) => {
        setRegistrationType(type);
        setStep(2);
        reset();
    };

    const nextStep = async () => {
        let fieldsToValidate = [];
        
        if (registrationType === 'student') {
            if (step === 2) fieldsToValidate = ['teamName', 'school', 'contactEmail', 'contactPhone'];
            if (step === 3) fieldsToValidate = ['teamMembers'];
        } else if (registrationType === 'school') {
            if (step === 2) fieldsToValidate = ['schoolName', 'schoolContactPerson', 'schoolContactEmail', 'schoolContactPhone'];
            if (step === 3) {
                fieldsToValidate = ['bulkStudents'];
                // Validate at least one student is added
                if (bulkStudentFields.length === 0) {
                    toast.error('Please add at least one student');
                    return;
                }
            }
        }

        const isValid = await trigger(fieldsToValidate);
        if (isValid) setStep(step + 1);
    };

    const prevStep = () => {
        if (step === 2 && registrationType) {
            setStep(1);
            setRegistrationType(null);
        } else {
            setStep(step - 1);
        }
    };

    const onSubmit = async (data) => {
        try {
            // Validate bulk students for school registration
            if (registrationType === 'school') {
                if (!data.bulkStudents || data.bulkStudents.length === 0) {
                    toast.error('Please add at least one student');
                    return;
                }
                // Filter out students with missing required fields
                const validStudents = data.bulkStudents.filter(s => s.name && s.grade);
                if (validStudents.length === 0) {
                    toast.error('Please ensure all students have name and grade');
                    return;
                }
                data.bulkStudents = validStudents;
            }

            const payload = {
                competitionId: id,
                registrationType,
                ...data,
                paymentId: `PAY_${Date.now()}`
            };

            if (registrationType === 'student') {
                payload.paymentAmount = competition.registrationFee;
            } else {
                payload.paymentAmount = competition.registrationFee * (data.bulkStudents?.length || 1);
            }

            await api.post('/registrations', payload);
            toast.success(
                registrationType === 'school' 
                    ? `Successfully registered ${data.bulkStudents?.length || 0} student(s)!`
                    : 'Mission Accepted! Registration Successful.',
                {
                    style: {
                        background: '#171717',
                        color: '#fff',
                        border: '1px solid #dc2626'
                    }
                }
            );
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed. Check your uplink.');
        }
    };

    if (loading) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-dark-900">
            <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        </div>
    );

    const getMaxSteps = () => {
        return registrationType === 'school' ? 4 : 4;
    };

    const getSteps = () => {
        if (!registrationType) {
            return [
                { id: 1, name: 'Select Type', icon: ShieldCheck }
            ];
        }
        if (registrationType === 'student') {
            return [
                { id: 1, name: 'Select Type', icon: ShieldCheck },
                { id: 2, name: 'Team Hub', icon: Users },
                { id: 3, name: 'Crew Roster', icon: User },
                { id: 4, name: 'Final Auth', icon: CreditCard }
            ];
        } else {
            return [
                { id: 1, name: 'Select Type', icon: ShieldCheck },
                { id: 2, name: 'School Info', icon: Building2 },
                { id: 3, name: 'Students', icon: GraduationCap },
                { id: 4, name: 'Final Auth', icon: CreditCard }
            ];
        }
    };

    const steps = getSteps();
    const maxSteps = getMaxSteps();

    return (
        <div className="bg-dark-900 min-h-screen pt-20 pb-20">
            <Breadcrumbs />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Progress Indicator */}
                {registrationType && (
                <div className="mb-12">
                    <div className="flex items-center justify-between relative">
                        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/5 -translate-y-1/2 -z-10"></div>
                        <div
                            className="absolute top-1/2 left-0 h-0.5 bg-primary -translate-y-1/2 -z-10 transition-all duration-500"
                                style={{ width: `${((step - 1) / (maxSteps - 1)) * 100}%` }}
                        ></div>

                        {steps.map((s) => (
                            <div key={s.id} className="flex flex-col items-center">
                                <div
                                    className={`w-12 h-12 rounded-sm flex items-center justify-center border-2 transition-all duration-300 ${step >= s.id
                                        ? 'bg-primary border-primary text-white shadow-[0_0_15px_rgba(220,38,38,0.5)]'
                                        : 'bg-dark-800 border-white/10 text-gray-500'
                                        }`}
                                >
                                    {step > s.id ? <Check className="w-6 h-6" /> : <s.icon className="w-6 h-6" />}
                                </div>
                                <span className={`mt-3 text-[10px] font-bold uppercase tracking-[0.2em] ${step >= s.id ? 'text-primary' : 'text-gray-600'}`}>
                                    {s.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                )}

                <div className="bg-dark-800 border border-white/10 p-8 sm:p-12 rounded-sm shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none"></div>

                    <div className="mb-10 text-center lg:text-left">
                        <h2 className="text-3xl font-heading font-bold text-white uppercase tracking-tighter mb-2">
                            Enlisting for <span className="text-primary">{competition.name}</span>
                        </h2>
                        <p className="text-gray-500 font-sans uppercase text-xs tracking-widest">
                            {!registrationType 
                                ? 'Step 1: Select Registration Type'
                                : `Step ${step} of ${maxSteps}: ${steps.find(s => s.id === step)?.name || ''}`
                            }
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        <AnimatePresence mode="wait">
                            {/* Step 1: Registration Type Selection */}
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <button
                                            type="button"
                                            onClick={() => selectRegistrationType('student')}
                                            className="p-8 bg-dark-900 border-2 border-white/10 hover:border-primary rounded-sm transition-all group text-left"
                                        >
                                            <User className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                                            <h3 className="text-xl font-heading font-bold text-white uppercase mb-2">Student Registration</h3>
                                            <p className="text-sm text-gray-400">Register individually or as a team for the competition</p>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => selectRegistrationType('school')}
                                            className="p-8 bg-dark-900 border-2 border-white/10 hover:border-primary rounded-sm transition-all group text-left"
                                        >
                                            <Building2 className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                                            <h3 className="text-xl font-heading font-bold text-white uppercase mb-2">School Registration</h3>
                                            <p className="text-sm text-gray-400">Register multiple students in bulk for your school</p>
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {/* Student Registration Steps */}
                            {registrationType === 'student' && step === 2 && (
                                <motion.div
                                    key="student-step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center">
                                                <Users className="w-3 h-3 mr-2 text-primary" /> Team Name
                                            </label>
                                            <input
                                                type="text"
                                                {...register('teamName', { required: 'Team Name is mandatory' })}
                                                className="w-full bg-dark-900 border border-white/10 rounded-sm py-4 px-6 text-white focus:outline-none focus:border-primary/50 transition-colors placeholder-gray-700"
                                                placeholder="COMMANDO SQUAD"
                                            />
                                            {errors.teamName && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider">{errors.teamName.message}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center">
                                                <School className="w-3 h-3 mr-2 text-primary" /> Institution / School
                                            </label>
                                            <input
                                                type="text"
                                                {...register('school', { required: 'Institution is required' })}
                                                className="w-full bg-dark-900 border border-white/10 rounded-sm py-4 px-6 text-white focus:outline-none focus:border-primary/50 transition-colors placeholder-gray-700"
                                                placeholder="TECH ACADEMY NORTH"
                                            />
                                            {errors.school && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider">{errors.school.message}</p>}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center">
                                                <Mail className="w-3 h-3 mr-2 text-primary" /> Uplink Email
                                            </label>
                                            <input
                                                type="email"
                                                {...register('contactEmail', {
                                                    required: 'Email is required',
                                                    pattern: { value: /^\S+@\S+$/i, message: 'Invalid uplink frequency (email)' }
                                                })}
                                                className="w-full bg-dark-900 border border-white/10 rounded-sm py-4 px-6 text-white focus:outline-none focus:border-primary/50 transition-colors placeholder-gray-700"
                                                placeholder="LEADER@SQUAD.COM"
                                            />
                                            {errors.contactEmail && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider">{errors.contactEmail.message}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center">
                                                <Phone className="w-3 h-3 mr-2 text-primary" /> Comms Channel
                                            </label>
                                            <input
                                                type="text"
                                                {...register('contactPhone', { required: 'Phone is required' })}
                                                className="w-full bg-dark-900 border border-white/10 rounded-sm py-4 px-6 text-white focus:outline-none focus:border-primary/50 transition-colors placeholder-gray-700"
                                                placeholder="+91 999 888 777"
                                            />
                                            {errors.contactPhone && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider">{errors.contactPhone.message}</p>}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {registrationType === 'student' && step === 3 && (
                                <motion.div
                                    key="student-step3"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-sm font-bold text-white uppercase tracking-[0.25em] flex items-center">
                                            <div className="w-1 h-4 bg-primary mr-3"></div> CREW MEMBERS
                                        </h3>
                                        <button
                                            type="button"
                                            onClick={() => appendTeamMember({ name: '', grade: '', school: '', role: 'Member' })}
                                            className="text-[10px] font-bold text-primary uppercase border border-primary/30 px-4 py-2 hover:bg-primary hover:text-white transition-all tracking-widest"
                                        >
                                            + Draft Member
                                        </button>
                                    </div>

                                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-primary scrollbar-track-dark-900">
                                        {teamMemberFields.map((item, index) => (
                                            <div key={item.id} className="p-6 bg-dark-900 border border-white/5 rounded-sm relative group animate-fade-in">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div>
                                                        <input
                                                            placeholder="FULL NAME"
                                                            className="w-full bg-dark-800 border border-white/10 rounded-sm py-3 px-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
                                                            {...register(`teamMembers.${index}.name`, { required: true })}
                                                        />
                                                    </div>
                                                    <div className="flex gap-4">
                                                        <input
                                                            placeholder="GRADE"
                                                            type="text"
                                                            className="w-1/3 bg-dark-800 border border-white/10 rounded-sm py-3 px-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
                                                            {...register(`teamMembers.${index}.grade`, { required: true })}
                                                        />
                                                        <input
                                                            placeholder="ROLE (e.g. PILOT)"
                                                            className="flex-1 bg-dark-800 border border-white/10 rounded-sm py-3 px-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
                                                            {...register(`teamMembers.${index}.role`)}
                                                        />
                                                    </div>
                                                </div>
                                                {index > 0 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeTeamMember(index)}
                                                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-[10px]"
                                                    >
                                                        ✕
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* School Registration Steps */}
                            {registrationType === 'school' && step === 2 && (
                                <motion.div
                                    key="school-step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center">
                                                <Building2 className="w-3 h-3 mr-2 text-primary" /> School Name
                                            </label>
                                            <input
                                                type="text"
                                                {...register('schoolName', { required: 'School Name is required' })}
                                                className="w-full bg-dark-900 border border-white/10 rounded-sm py-4 px-6 text-white focus:outline-none focus:border-primary/50 transition-colors placeholder-gray-700"
                                                placeholder="TECH ACADEMY NORTH"
                                            />
                                            {errors.schoolName && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider">{errors.schoolName.message}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center">
                                                <User className="w-3 h-3 mr-2 text-primary" /> Contact Person
                                            </label>
                                            <input
                                                type="text"
                                                {...register('schoolContactPerson', { required: 'Contact Person is required' })}
                                                className="w-full bg-dark-900 border border-white/10 rounded-sm py-4 px-6 text-white focus:outline-none focus:border-primary/50 transition-colors placeholder-gray-700"
                                                placeholder="JOHN DOE"
                                            />
                                            {errors.schoolContactPerson && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider">{errors.schoolContactPerson.message}</p>}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center">
                                                <Mail className="w-3 h-3 mr-2 text-primary" /> School Email
                                            </label>
                                            <input
                                                type="email"
                                                {...register('schoolContactEmail', {
                                                    required: 'Email is required',
                                                    pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' }
                                                })}
                                                className="w-full bg-dark-900 border border-white/10 rounded-sm py-4 px-6 text-white focus:outline-none focus:border-primary/50 transition-colors placeholder-gray-700"
                                                placeholder="SCHOOL@EXAMPLE.COM"
                                            />
                                            {errors.schoolContactEmail && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider">{errors.schoolContactEmail.message}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center">
                                                <Phone className="w-3 h-3 mr-2 text-primary" /> School Phone
                                            </label>
                                            <input
                                                type="text"
                                                {...register('schoolContactPhone', { required: 'Phone is required' })}
                                                className="w-full bg-dark-900 border border-white/10 rounded-sm py-4 px-6 text-white focus:outline-none focus:border-primary/50 transition-colors placeholder-gray-700"
                                                placeholder="+91 999 888 777"
                                            />
                                            {errors.schoolContactPhone && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider">{errors.schoolContactPhone.message}</p>}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center">
                                            <School className="w-3 h-3 mr-2 text-primary" /> School Address
                                        </label>
                                        <textarea
                                            {...register('schoolAddress')}
                                            className="w-full bg-dark-900 border border-white/10 rounded-sm py-4 px-6 text-white focus:outline-none focus:border-primary/50 transition-colors placeholder-gray-700"
                                            placeholder="School Address (Optional)"
                                            rows="3"
                                        />
                                    </div>
                                </motion.div>
                            )}

                            {registrationType === 'school' && step === 3 && (
                                <motion.div
                                    key="school-step3"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-sm font-bold text-white uppercase tracking-[0.25em] flex items-center">
                                            <div className="w-1 h-4 bg-primary mr-3"></div> STUDENTS ({bulkStudentFields.length})
                                        </h3>
                                        <button
                                            type="button"
                                            onClick={() => appendBulkStudent({ name: '', grade: '', email: '', phone: '', parentName: '', parentEmail: '', parentPhone: '' })}
                                            className="text-[10px] font-bold text-primary uppercase border border-primary/30 px-4 py-2 hover:bg-primary hover:text-white transition-all tracking-widest"
                                        >
                                            + Add Student
                                        </button>
                                    </div>

                                    <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-primary scrollbar-track-dark-900">
                                        {bulkStudentFields.map((item, index) => (
                                            <div key={item.id} className="p-6 bg-dark-900 border border-white/5 rounded-sm relative group">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                                    <div>
                                                        <input
                                                            placeholder="STUDENT NAME *"
                                                            className="w-full bg-dark-800 border border-white/10 rounded-sm py-3 px-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
                                                            {...register(`bulkStudents.${index}.name`, { required: 'Name is required' })}
                                                        />
                                                    </div>
                                                    <div>
                                                        <input
                                                            placeholder="GRADE *"
                                                            type="number"
                                                            className="w-full bg-dark-800 border border-white/10 rounded-sm py-3 px-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
                                                            {...register(`bulkStudents.${index}.grade`, { required: 'Grade is required', valueAsNumber: true })}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                                    <div>
                                                        <input
                                                            placeholder="STUDENT EMAIL"
                                                            type="email"
                                                            className="w-full bg-dark-800 border border-white/10 rounded-sm py-3 px-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
                                                            {...register(`bulkStudents.${index}.email`)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <input
                                                            placeholder="STUDENT PHONE"
                                                            className="w-full bg-dark-800 border border-white/10 rounded-sm py-3 px-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
                                                            {...register(`bulkStudents.${index}.phone`)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                    <div>
                                                        <input
                                                            placeholder="PARENT NAME"
                                                            className="w-full bg-dark-800 border border-white/10 rounded-sm py-3 px-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
                                                            {...register(`bulkStudents.${index}.parentName`)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <input
                                                            placeholder="PARENT EMAIL"
                                                            type="email"
                                                            className="w-full bg-dark-800 border border-white/10 rounded-sm py-3 px-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
                                                            {...register(`bulkStudents.${index}.parentEmail`)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <input
                                                            placeholder="PARENT PHONE"
                                                            className="w-full bg-dark-800 border border-white/10 rounded-sm py-3 px-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
                                                            {...register(`bulkStudents.${index}.parentPhone`)}
                                                        />
                                                    </div>
                                                </div>
                                                {index > 0 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeBulkStudent(index)}
                                                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-[10px]"
                                                    >
                                                        ✕
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Final Step - Review and Payment */}
                            {step === 4 && (
                                <motion.div
                                    key="final-step"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-8"
                                >
                                    <div className="p-8 bg-dark-900 border border-white/10 rounded-sm space-y-6">
                                        <div className="grid grid-cols-2 gap-8 text-sm">
                                            {registrationType === 'student' ? (
                                                <>
                                            <div>
                                                <p className="text-gray-500 uppercase font-bold tracking-widest text-[10px] mb-1">Squad Name</p>
                                                <p className="text-white font-heading text-xl">{formData.teamName || 'NOT SPECIFIED'}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-500 uppercase font-bold tracking-widest text-[10px] mb-1">Base Location</p>
                                                <p className="text-white font-heading text-xl">{formData.school || 'NOT SPECIFIED'}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-500 uppercase font-bold tracking-widest text-[10px] mb-1">Crew Count</p>
                                                <p className="text-white font-heading text-xl">{formData.teamMembers?.length} MEMBERS</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-500 uppercase font-bold tracking-widest text-[10px] mb-1">Registration Fee</p>
                                                <p className="text-primary font-heading text-xl">₹{competition.registrationFee}</p>
                                            </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div>
                                                        <p className="text-gray-500 uppercase font-bold tracking-widest text-[10px] mb-1">School Name</p>
                                                        <p className="text-white font-heading text-xl">{formData.schoolName || 'NOT SPECIFIED'}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-500 uppercase font-bold tracking-widest text-[10px] mb-1">Contact Person</p>
                                                        <p className="text-white font-heading text-xl">{formData.schoolContactPerson || 'NOT SPECIFIED'}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-500 uppercase font-bold tracking-widest text-[10px] mb-1">Total Students</p>
                                                        <p className="text-white font-heading text-xl">{formData.bulkStudents?.length || 0} STUDENTS</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-500 uppercase font-bold tracking-widest text-[10px] mb-1">Total Amount</p>
                                                        <p className="text-primary font-heading text-xl">₹{(competition.registrationFee * (formData.bulkStudents?.length || 0)).toLocaleString()}</p>
                                                    </div>
                                                </>
                                            )}
                                        </div>

                                        <div className="pt-6 border-t border-white/5 bg-primary/5 p-4 rounded-sm flex items-start">
                                            <Info className="w-5 h-5 text-primary mr-4 mt-0.5 flex-shrink-0" />
                                            <p className="text-xs text-gray-400 leading-relaxed italic">
                                                By proceeding, you verify all data is accurate. Any changes post-registration must be cleared through administrative uplink.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="bg-dark-900 p-6 border border-white/10 flex items-center justify-between rounded-sm">
                                        <div className="flex items-center">
                                            <CreditCard className="w-6 h-6 text-primary mr-4" />
                                            <div>
                                                <p className="text-xs font-bold text-white uppercase tracking-widest">Total Transaction</p>
                                                <p className="text-lg font-heading font-bold text-primary">
                                                    ₹{registrationType === 'school' 
                                                        ? (competition.registrationFee * (formData.bulkStudents?.length || 0)).toLocaleString()
                                                        : competition.registrationFee
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            className="bg-primary hover:bg-red-700 text-white px-8 py-4 rounded-sm font-bold uppercase text-sm tracking-widest shadow-[0_0_20px_rgba(220,38,38,0.3)] transition-all flex items-center group"
                                        >
                                            INITIATE PAYMENT
                                            <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Navigation Buttons */}
                        <div className="flex justify-between pt-10 border-t border-white/5">
                            {step > 1 ? (
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className="flex items-center text-xs font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-widest"
                                >
                                    <ChevronLeft className="w-4 h-4 mr-2" /> RE-CALIBRATE PREVIOUS
                                </button>
                            ) : (
                                <Link
                                    to={`/competitions/${id}`}
                                    className="flex items-center text-xs font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-widest"
                                >
                                    <ChevronLeft className="w-4 h-4 mr-2" /> ABORT MISSION
                                </Link>
                            )}

                            {step < maxSteps && (
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    className="bg-white/5 border border-white/10 hover:border-primary/50 text-white px-8 py-4 rounded-sm font-bold uppercase text-sm tracking-widest transition-all shadow-xl flex items-center group"
                                >
                                    NEXT PROTOCOL
                                    <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.3em]">
                        Powered by <span className="text-white/40">ABL Education</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CompetitionRegister;
