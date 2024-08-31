import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async ConfirmarRegistro(destinatario: string, codigo: string) {
    await this.mailerService.sendMail({
      to: destinatario,
      subject: 'Confirmação de Registro',
      template: './confirmation',
      context: {
        // dados passados para o template
        codigo,
        remetente: process.env.EMAIL_USER,
      },
    });
  }

  gerarCodigo(lenght) {
    let code = '';
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#%&*';
    for (let i = 0; i >= lenght; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      code += chars[randomIndex];
    }

    return code;
  }
}

/*

<div style="width:100%;color:#68778d;font-family:proxima-nova,Helvetica,Arial,sans-serif;font-size:16px;line-height:22px;margin:0;padding:0">
    <table width="100%" height="100%" cellpadding="0" cellspacing="0" border="0" align="left" valign="top" style="float:unset">
      <tbody>
        <tr>
          <td align="center" valign="top">
            <table width="100%" align="center" cellpadding="0" cellspacing="0" style="background-color:#ffffff;float:unset" border="0" valign="top" bgcolor="#FFFFFF">
              <tbody>
                <tr>
                  <td>





<table align="center" style="background-color:#ffffff;border-spacing:20px 0;max-width:640px;width:100%;float:unset" cellpadding="0" cellspacing="0" border="0" valign="top"">
  <tbody>
    <tr>
      <td><a class="logo" href="" rel="noopener noreferrer" style="display:block;font-size:0;line-height:1;margin-top:40px;color:#49cc68;font-weight:600;text-decoration:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q=""=gmail&amp;"><img alt="Uphold" src="https://ci3.googleusercontent.com/meips/ADKq_NZ5wS2IY_S1ehimu1FRXpxqLd8kke_Ge1VsFXetXSecAhsya-g44paksHmwOkLCiktUOJ_TCNZ9Xti9vkWTqC1V_o2LsAJWa1gKCMDJr_VCph9L61LnlNGPUQ8JMjMTVOZqel_prhTT-a9X_7E07pJr-vhdq2vQJaRIUgrVXR8XQKWw7jSe5eStuQ=s0-d-e1-ft#https://images.prismic.io/uphold/cbf2600ae7977ef16375ca9429822b9188c81c66_logo-email-header.png?auto=compress,format" style="height:38px;width:120px" class="CToWUd" data-bit="iit"></a></td>
    </tr>
  </tbody>
</table>
<table align="center" style="background-repeat:no-repeat;float:unset" width="100%" cellpadding="0" cellspacing="0" border="0" valign="top">
  <tbody>
    <tr>
      <td>
        <table align="center" bgcolor="" style="margin-top:56px;width:100%;float:unset" cellpadding="0" cellspacing="0" border="0" valign="top">
          <tbody>
            <tr>
              <td>
                <table align="center" bgcolor="#FFFFFF" style="border-spacing:20px 0;max-width:640px;width:100%;float:unset" cellpadding="0" cellspacing="0" border="0" valign="top">
                  <tbody>
                    <tr>
                      <td>
                        <table cellpadding="0" cellspacing="0" border="0" align="left" valign="top" style="float:unset">
                          <tbody>
                            <tr>
                              <td>
                                <div class="">
                                  <div>
                                    <h1 style="color:#3c4a5b;font-weight:bold;font-size:32px;line-height:43px;margin:0">Don’t worry, this can happen for many reasons. Let’s get you sorted now.</h1>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table align="center" class="" style="border-spacing:20px 0;max-width:640px;width:100%;margin-top:20px;float:unset" cellpadding="0" cellspacing="0" border="0" valign="top">
                  <tbody>
                    <tr>
                      <td>
                        <table cellpadding="0" cellspacing="0" border="0" align="left" valign="top" style="float:unset">
                          <tbody>
                            <tr>
                              <td>
                                <p style="margin:0">Olá,</p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table align="center" class="" style="border-spacing:20px 0;max-width:640px;width:100%;margin-top:20px;float:unset" cellpadding="0" cellspacing="0" border="0" valign="top">
                  <tbody>
                    <tr>
                      <td>
                        <div class="">
                          <div>
                            <p style="margin:0">Unfortunately, we weren’t able to verify your ID this time around. There are many reasons this can happen. For example, photos may not be well lit, text not clearly readable, or you may have submitted a duplicate ID.</p>
                            <p style="margin:16px 0 0">Take a look at our FAQ to <a href="https://support.uphold.com/hc/en-us/articles/206119603-How-do-I-become-a-verified-member-of-Uphold-" rel="noopener noreferrer" style="color:#49cc68;font-weight:600;text-decoration:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q=""=gmail&amp;ust=""=AOvVaw2C4Cf0ZNFCQXTGrZmLa-3G">learn more</a> and then re-submit using a valid, government-issued photo ID (such as a passport or driver’s license).</p>
                            <p style="margin:16px 0 0"></p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table align="center" class="" style="border-spacing:20px 0;max-width:640px;width:100%;margin-top:20px;float:unset" cellpadding="0" cellspacing="0" border="0" valign="top">
                  <tbody>
                    <tr>
                      <td>
                        <table width="100%" cellpadding="0" cellspacing="0" border="0" align="left" valign="top" style="float:unset">
                          <tbody>
                            <tr>
                              <td>
                                <div style="text-align:left;width:100%" align="left"><span style="display:none">

  </span><a class="m_4451988621080153835uph-slice-button" href="https://uphold.com/dashboard/membership/identify?link_id="{}"" rel="noopener noreferrer" style="background-color:#49cc68;border-bottom-width:11px;border-bottom-style:solid;border-bottom-color:transparent;border-radius:22px;border-top-width:11px;border-top-style:solid;border-top-color:transparent;box-sizing:border-box;color:#ffffff;display:inline-block;font-weight:600;padding-left:48px;padding-right:48px;text-align:center;text-decoration:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q={};source=gmail&amp;ust={};usg=AOvVaw3XuUXqqLPKXGzOBgPdF09D">Re-submit</a></div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table align="center" class="m_4451988621080153835uph-slice" style="border-spacing:20px 0;max-width:640px;width:100%;margin-top:20px;float:unset" cellpadding="0" cellspacing="0" border="0" valign="top">
                  <tbody>
                    <tr>
                      <td>
                        <table cellpadding="0" cellspacing="0" border="0" align="left" valign="top" style="float:unset">
                          <tbody>
                            <tr>
                              <td>
                                <div style="margin-bottom:24px">
                                  <div class="m_4451988621080153835uph-text-slice-content">
                                    <div>
                                      <p style="margin:0">Cheers,</p>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <p style="margin:0">Team Uphold</p>
                                  <p style="font-size:14px;font-weight:700;margin:8px 0 0"></p>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table align="center" style="max-width:640px;width:100%;float:unset" cellpadding="0" cellspacing="0" border="0" valign="top">
                  <tbody>
                    <tr>
                      <td>
                        <table align="center" class="m_4451988621080153835uph-slice" style="border-spacing:20px 0;margin-top:40px;width:100%;float:unset" cellpadding="0" cellspacing="0" border="0" valign="top">
                          <tbody>
                            <tr>
                              <td style="border-top-width:1px;border-top-color:#e4eaf2;border-top-style:solid">
                                <table class="m_4451988621080153835uph-tip" cellpadding="0" cellspacing="0" border="0" align="left" valign="top" style="float:left;margin-bottom:56px;margin-top:56px;width:100%">
                                  <tbody>
                                    <tr valign="top">
                                      <td><img alt="" src="https://ci3.googleusercontent.com/meips/ADKq_NZrHSl1KyHMgcBOc5BoKnmZ1CUlaCcqpNemIZKrtmT0-CDlBVS-iqUH-Z140BXLPaBaXkYZCOuEnGLC9YqiEc03hNEesWPtYMNBRroRq9n4iL2EUbDSwb6mm3Qc66C0x5hRGDBpM08CbzDc9E_y47gF2s1FXWHajLyIPhoql3js=s0-d-e1-ft#https://images.prismic.io/uphold/e6eed66d5d91d973e6348719d21c7ec597f7f5ff_support.png?auto=compress,format" width="32" height="32" style="display:block;outline:none;text-decoration:none;border:none" class="CToWUd" data-bit="iit"></td>
                                      <td style="padding-left:20px"><span style="display:block;font-weight:bold;line-height:24px;margin-bottom:8px">Any questions or need help?</span><span style="font-size:14px;line-height:20px"><div class="m_4451988621080153835uph-text-slice-content"><div><p style="margin:0">Check our <a href="https://support.uphold.com/" rel="noopener noreferrer" style="color:#49cc68;font-weight:600;text-decoration:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://support.uphold.com/&amp;source=gmail&amp;ust=1724681191842000&amp;usg=AOvVaw0gsoL8UfQh3PXSPw9iOHx2">FAQs</a> or contact our <a href="https://support.uphold.com/hc/en-us/requests/new" rel="noopener noreferrer" style="color:#49cc68;font-weight:600;text-decoration:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://support.uphold.com/hc/en-us/requests/new&amp;source=gmail&amp;ust=1724681191842000&amp;usg=AOvVaw2AQAR4q41BEzustBtR86x0">support team</a>.</p></div></div></span></td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <table style="margin-top:20px;float:unset" width="100%" cellpadding="0" cellspacing="0" border="0" align="left" valign="top">
                          <tbody>
                            <tr>
                              <td>
                                <table style="max-width:640px;padding-left:20px;padding-right:20px;float:unset" width="100%" cellpadding="0" cellspacing="0" border="0" align="left" valign="top">
                                  <tbody>
                                    <tr>
                                      <td>
                                        <table align="center" width="100%" class="m_4451988621080153835uph-mobile-container" style="border-top-style:solid;border-top-color:#e4eaf2;border-top-width:1px;color:#68778d;font-size:14px;letter-spacing:0.4px;padding-bottom:28px;padding-top:28px;width:100%;float:unset">
                                          <tbody>
                                            <tr>
                                              <td class="m_4451988621080153835uph-col-content m_4451988621080153835center-in-mobile" style="vertical-align:top;width:50%;padding:12px 0" valign="top">
                                                <p style="display:inline-block;line-height:1.35;max-width:250px;margin:0">Uphold works best on mobile, download our app now.</p>
                                              </td>
                                              <td class="m_4451988621080153835uph-col-content m_4451988621080153835center-in-mobile" style="text-align:right;vertical-align:top;width:50%;padding:12px 0" align="right" valign="top">
                                                <div style="display:inline-block"><a href="https://itunes.apple.com/app/id1101145849?mt=8" style="display:inline-block;margin-left:0;margin-right:1px;width:140px;color:#49cc68;font-weight:600;text-decoration:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://itunes.apple.com/app/id1101145849?mt%3D8&amp;source=gmail&amp;ust=1724681191842000&amp;usg=AOvVaw31YVF6r4_A7ytJRhDPixbR"><img alt="" src="https://ci3.googleusercontent.com/meips/ADKq_NbKp2-BeU7BhJSyprq58uDnDaoq4yKNfWJtUpLX95N0_WF3RWWLcJUoQLtlH-e883s6eJKpLDAjJ13flycnHkMYcblflwHE-7eWiuawDpLkd_B6y2vWWBqQ015TwB5zzuC9rOSDyX3ehj7_UDlmOy0ol2dX0TV2uzVioKcwAcNRT24=s0-d-e1-ft#https://images.prismic.io/uphold/26aa70a7-ee17-41be-b313-7c3d28fc7ad5_appstore%402x.png?auto=compress,format" style="display:block;height:auto;width:100%" class="CToWUd" data-bit="iit"></a><a href="https://play.google.com/store/apps/details?id=com.uphold.wallet" style="display:inline-block;margin-left:1px;margin-right:0;width:140px;color:#49cc68;font-weight:600;text-decoration:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://play.google.com/store/apps/details?id%3Dcom.uphold.wallet&amp;source=gmail&amp;ust=1724681191842000&amp;usg=AOvVaw3NzQzMbIPVjOruOppd4KP8"><img alt="" src="https://ci3.googleusercontent.com/meips/ADKq_Nb3BqBTnUw19TYr22h8ad8BHM4WaMvj5sRr5h3EXlvbD3384W7-dYiUSlv7gmYs9PLF9dNsVZvB_pjh540CpEhoj13DNP-gtJAC817wDPN3OcSPYDMYdO8w2kIq4--YcZM-gQ0HjE-hfKkJBK0Jj4iEk2ZHa0YQiuIIp3A4c1pBpotq=s0-d-e1-ft#https://images.prismic.io/uphold/00554beb-42fc-495a-98b4-54db7b7a268c_playstore%402x.png?auto=compress,format" style="display:block;height:auto;width:100%" class="CToWUd" data-bit="iit"></a></div>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>
<table bgcolor="#F5F9FC" style="width:100%;float:unset" cellpadding="0" cellspacing="0" border="0" align="left" valign="top">
  <tbody>
    <tr>
      <td>
        <table align="center" style="border-spacing:20px 40px;color:#68778d;font-size:12px;letter-spacing:0.8px;max-width:640px;width:100%;float:unset" cellpadding="0" cellspacing="0" border="0" valign="top">
          <tbody>
            <tr>
              <td>
                <table class="m_4451988621080153835uph-footer-social" style="float:right;max-width:250px;text-align:right" cellpadding="0" cellspacing="0" border="0" align="left" valign="top">
                  <tbody>
                    <tr>
                      <td><span style="display:inline-block;margin-right:12px"><a href="https://www.facebook.com/upholdinc/" style="text-decoration:underline;color:#49cc68;font-weight:600" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.facebook.com/upholdinc/&amp;source=gmail&amp;ust=1724681191842000&amp;usg=AOvVaw0dzox3okpU20biIjG8wOtC"><img alt="" src="https://ci3.googleusercontent.com/meips/ADKq_Nb3RWC3YsALjCvjnDQIPeC4hO-tVZMG6TMRUU07XZ9Y7t08MlrrM-TH-oIy2Kqox8-h2HbDRVzWShRcs1eRRDVFkOxr-Liz-2PWG-Nn0tSF9ZPlkLc7UDnNPt1dfJEjBVYqYLSmRXJC6xITqbqZ1wQHBj8EJmLnsdAVEPAF4PA=s0-d-e1-ft#https://images.prismic.io/uphold%2F3ca36d4c-027f-422a-b8b7-2da262c9bf91_facebook.png?auto=compress,format" width="32" height="32" style="display:block;outline:none;text-decoration:none;border:none" class="CToWUd" data-bit="iit"></a></span><span style="display:inline-block;margin-right:12px"><a href="https://twitter.com/UpholdInc" style="text-decoration:underline;color:#49cc68;font-weight:600" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://twitter.com/UpholdInc&amp;source=gmail&amp;ust=1724681191843000&amp;usg=AOvVaw36IKOuVxqszneSF_bydMv8"><img alt="" src="https://ci3.googleusercontent.com/meips/ADKq_NYmOasrgt4iqzNWyrQJZSZB6GfaAti6jm8-wd3pmOTMAFvD3ovaz-jf5687tYVvcLBMLPc7ge_kCUCJsdBIGNaOqz_df-pqAcyWaZKbEb_lMD1pQ39_YRy4EKV1WyIMz6h8dT4_k5wSPdqLAjcu7jbd6ofOxPj6yZcm2nVGLg=s0-d-e1-ft#https://images.prismic.io/uphold%2F76cef93a-0b85-4574-a6c7-1eab4842d973_twitter.png?auto=compress,format" width="32" height="32" style="display:block;outline:none;text-decoration:none;border:none" class="CToWUd" data-bit="iit"></a></span><span style="display:inline-block;margin-right:0"><a href="https://www.linkedin.com/company/upholdinc/" style="text-decoration:underline;color:#49cc68;font-weight:600" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.linkedin.com/company/upholdinc/&amp;source=gmail&amp;ust=1724681191843000&amp;usg=AOvVaw1YAsh5dXKAlIWJ1r4Bxfon"><img alt="" src="https://ci3.googleusercontent.com/meips/ADKq_NYC2zqudSnID067R1531wgvsHyx6mKccX_P9wViSaO59A32PKYi81DlE29LWQPKb0KkP5PxPm-acEHCq6hPOUFMEZzOsvcX7dqEgztD8X2nrm9zGmP4wT7NzS0SGAnJC9wNVMp4Y6yq7rATN925qDFBFFSiT1FcrUNlBJS59I0=s0-d-e1-ft#https://images.prismic.io/uphold%2F0639df43-e2de-47dc-89bb-d00428841095_linkedin.png?auto=compress,format" width="32" height="32" style="display:block;outline:none;text-decoration:none;border:none" class="CToWUd" data-bit="iit"></a></span></td>
                    </tr>
                  </tbody>
                </table>
                <table class="m_4451988621080153835uph-footer-address m_4451988621080153835uph-footer-text" style="float:left;max-width:350px;width:100%" cellpadding="0" cellspacing="0" border="0" align="left" valign="top">
                  <tbody>
                    <tr>
                      <td>
                        <div class="m_4451988621080153835uph-text-slice-content">
                          <div>
                            <p style="font-size:12px;letter-spacing:0.4px;line-height:21px;margin:0"><strong>© 2024 Uphold. All rights reserved.</strong></p>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td class="m_4451988621080153835uph-footer-text m_4451988621080153835-uph-address" style="padding-top:4px">
                        <div class="m_4451988621080153835uph-text-slice-content">




    </div></td></tr><tr><td class=""><div class="m_4451988621080153835uph-text-slice-content"><div><p style="font-size:12px;letter-spacing:0.4px;line-height:21px;margin:0">Uphold Worldwide Ltd., Reg No. 177867
Registered Office: Aristo House, Office A, The Balmoral, #78 Sanford Drive, Nassau, Bahamas</p></div></div></td></tr>



                  </tbody>
                </table>
                <table style="color:#68778d;font-size:12px;letter-spacing:0.8px;float:unset" width="100%" cellpadding="0" cellspacing="0" border="0" align="left" valign="top">
                  <tbody>
                    <tr>
                      <td class="m_4451988621080153835uph-footer-text">
                        <table style="display:block;height:24px;width:100%;float:unset" cellpadding="0" cellspacing="0" border="0" align="left" valign="top">
                          <tbody></tbody>
                        </table>
                        <div class="">




    <div class=""><p style="font-size:12px;letter-spacing:0.4px;line-height:21px;margin:0">This e-mail message and any attachments are confidential. Dissemination, distribution or copying of this e-mail or any attachments by anyone other than the intended recipient is prohibited. If you are not the intended recipient, please notify Uphold immediately by contacting <a href="mailto:{}" rel="noopener noreferrer" style="color:#49cc68;font-weight:600;text-decoration:none" target="_blank">{}</a>, and destroy all copies of this e-mail and any attachments. For more information please review our <span style="display:none">

  </span><a href="https://uphold.com/en/legal/privacy-policy?link_id={}" rel="noopener noreferrer" style="color:#49cc68;font-weight:600;text-decoration:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q={};source=gmail&amp;ust={};usg=AOvVaw0IajHTl8JfDcTb3-JzWjw9">privacy policy</a>.</p></div>
    </div>
                        <table style="display:block;height:24px;width:100%;float:unset" cellpadding="0" cellspacing="0" border="0" align="left" valign="top">
                          <tbody></tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>




              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
</div></div>



*/
