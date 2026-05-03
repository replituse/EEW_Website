import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { MapPin, Phone, Mail, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/contexts/ThemeContext";

const formSchema = z.object({
  name:    z.string().min(2, "Name must be at least 2 characters."),
  phone:   z.string().min(10, "Phone number must be at least 10 digits.").max(15, "Phone number is too long.").regex(/^\d+$/, "Phone number must contain digits only."),
  email:   z.string().email("Please enter a valid email address.").optional().or(z.literal("")),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", phone: "", email: "", message: "" },
  });

  function onSubmit(_values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast({ title: "Message Sent Successfully!", description: "We will get back to you regarding your electrical panel requirements soon." });
      form.reset();
    }, 1500);
  }

  const contactDetails = [
    { icon: <Phone className="w-6 h-6" />, title: "Call Us",   value: "+91 7767062794",                          link: "tel:+917767062794" },
    { icon: <Mail className="w-6 h-6" />,  title: "Email Us",  value: "electricalsengineeringworks@gmail.com",  link: "mailto:electricalsengineeringworks@gmail.com" },
    { icon: <MapPin className="w-6 h-6" />, title: "Location", value: "Thane, Maharashtra, India",              link: "https://maps.google.com/?q=Thane,Maharashtra" },
  ];

  const infoBg    = isDark ? "#080c22"                : "#dde7f8";
  const cardBg    = isDark ? "rgba(15,21,53,1)"       : "#ffffff";
  const cardBorder= isDark ? "rgba(255,255,255,0.08)" : "rgba(10,14,39,0.12)";
  const headColor = isDark ? "#ffffff"                : "#0a0e27";
  const subColor  = isDark ? "rgba(255,255,255,0.5)"  : "rgba(10,14,39,0.45)";
  const valColor  = isDark ? "#ffffff"                : "#0a0e27";
  const labelColor= isDark ? "rgba(255,255,255,0.75)" : "rgba(10,14,39,0.7)";
  const iconBorder= isDark ? "rgba(255,255,255,0.1)"  : "rgba(10,14,39,0.15)";
  const iconBg    = isDark ? "rgba(255,255,255,0.05)" : "rgba(10,14,39,0.06)";

  return (
    <section id="contact" className="py-24 bg-background relative overflow-hidden transition-colors duration-300">
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10h80v80h-80z' fill='none' stroke='%23f5c518' stroke-width='1'/%3E%3Cpath d='M30 30h40v40h-40z' fill='none' stroke='%23f5c518' stroke-width='1'/%3E%3Cpath d='M50 10v20M50 70v20M10 50h20M70 50h20' stroke='%23f5c518' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: "100px 100px",
        }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-3xl md:text-5xl font-heading font-bold mb-4"
            style={{ color: headColor }}
          >
            Get In <span className="text-primary drop-shadow-[0_0_15px_rgba(245,197,24,0.5)]">Touch</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Ready to power your next project? Reach out for a detailed BOQ quotation or technical consultation.
          </motion.p>
        </div>

        <div
          className="grid grid-cols-1 lg:grid-cols-5 gap-0 rounded-2xl overflow-hidden shadow-2xl"
          style={{ background: cardBg, border: `1px solid ${cardBorder}` }}
        >
          {/* Contact Info Panel */}
          <div
            className="lg:col-span-2 p-8 md:p-12 relative overflow-hidden flex flex-col gap-8 transition-colors duration-300"
            style={{ background: infoBg }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/15 rounded-full blur-[80px] pointer-events-none" />

            <h3 className="text-2xl font-heading font-bold relative z-10" style={{ color: headColor }}>
              Contact Information
            </h3>

            <div className="flex flex-col gap-7 relative z-10">
              {contactDetails.map((detail, idx) => (
                <motion.a
                  key={idx}
                  href={detail.link}
                  target={detail.title === "Location" ? "_blank" : "_self"}
                  rel="noreferrer"
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-4 group"
                  data-testid={`link-contact-${detail.title.toLowerCase().replace(" ", "-")}`}
                >
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background transition-all duration-300 flex-shrink-0"
                    style={{ background: iconBg, border: `1px solid ${iconBorder}` }}
                  >
                    {detail.icon}
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold mb-1 uppercase tracking-widest" style={{ color: subColor }}>
                      {detail.title}
                    </h4>
                    <p className="font-medium group-hover:text-primary transition-colors text-sm" style={{ color: valColor }}>
                      {detail.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Google Map */}
            <div
              className="mt-4 rounded-xl overflow-hidden relative z-10 flex-grow min-h-[200px]"
              style={{ border: `1px solid ${iconBorder}` }}
            >
              <iframe
                title="EEW Location - Thane, Maharashtra"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120760.01398765483!2d72.94433315!3d19.21672475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b8e3e9a44dbf%3A0xe7b5cedc19dcf43c!2sThane%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1699999999999!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ minHeight: "200px", border: 0, filter: isDark ? "invert(90%) hue-rotate(180deg) saturate(0.8)" : "none" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Form Panel */}
          <div className="lg:col-span-3 p-8 md:p-12 relative transition-colors duration-300" style={{ background: cardBg }}>
            <h3 className="text-2xl font-heading font-bold mb-8" style={{ color: headColor }}>
              Send us a Message
            </h3>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                      <FormLabel style={{ color: labelColor }}>Full Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" className="bg-background border-border focus-visible:ring-primary h-12" data-testid="input-name" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs" />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem>
                      <FormLabel style={{ color: labelColor }}>Phone Number *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="9876543210" className="bg-background border-border focus-visible:ring-primary h-12"
                          inputMode="numeric" data-testid="input-phone" {...field}
                          onChange={(e) => field.onChange(e.target.value.replace(/\D/g, ""))}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs" />
                    </FormItem>
                  )} />
                </div>

                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel style={{ color: labelColor }}>Email Address (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="john@example.com" type="email" className="bg-background border-border focus-visible:ring-primary h-12" data-testid="input-email" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                )} />

                <FormField control={form.control} name="message" render={({ field }) => (
                  <FormItem>
                    <FormLabel style={{ color: labelColor }}>Requirements / Message *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Please describe your panel requirements, expertise needed, or attach BOQ details..."
                        className="bg-background border-border focus-visible:ring-primary min-h-[150px] resize-none"
                        data-testid="textarea-message" {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                )} />

                <Button
                  type="submit" disabled={isSubmitting}
                  className="w-full h-14 text-base font-bold bg-primary text-background hover:bg-primary/90 group overflow-hidden relative shadow-[0_0_20px_rgba(245,197,24,0.25)] hover:shadow-[0_0_30px_rgba(245,197,24,0.5)] transition-all"
                  data-testid="button-submit"
                >
                  <div className="absolute inset-0 w-full h-full bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                  {isSubmitting ? (
                    <span className="flex items-center gap-2"><Loader2 className="w-5 h-5 animate-spin" /> Processing...</span>
                  ) : (
                    <span className="flex items-center gap-2">Request Quotation <Send className="w-4 h-4 ml-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></span>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
