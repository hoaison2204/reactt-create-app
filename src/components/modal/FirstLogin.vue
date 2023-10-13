<template>
  <div class="p-personal-information-modal">
    <Modal
      ref="personal-information-modal"
      width-size="LL"
      htmlTitle="ベネフィット・ステーション<br class='c-displaySp' />（個人）会員規約"
      licenser="株式会社ベネフィット・ワン"
      @hide="hide"
    >
      <div>
        <!-- 以下、素書きの規約 参考：https://bs.benefit-one.co.jp/BE-ONE/official/rule.html-->
        <div class="p-personal-information-modal__body">
          <ul class="p-personal-information-modal__lists1">
            <li class="p-personal-information-modal__lists1__item">
              <h4 class="p-personal-information-modal__subTitle">第1条 目的</h4>
              <ul class="p-personal-information-modal__lists2">
                <li class="p-personal-information-modal__lists2__item">
                  <p class="p-personal-information-modal__text">
                    株式会社ベネフィット・ワン（以下「当社」という）の運営するベネフィット・ステーション（以下「本会」という）は、福利厚生サービス（健康管理サービス及び教育・研修サービス等を含む。以下同じ）を通じて会員企業・団体の発展とその役職員又は構成員のより豊かな生活を実現することを目的とする。
                  </p>
                </li>
              </ul>
            </li>

            <li class="p-personal-information-modal__lists1__item">
              <h4 class="p-personal-information-modal__subTitle">第2条 会員</h4>
              <ul class="p-personal-information-modal__lists2">
                <li class="p-personal-information-modal__lists2__item">
                  <span>1.</span>
                  <p class="p-personal-information-modal__text">
                    本会の目的に賛同し法人会員規約及び本規約を承認の上、入会申込みを行い、当社が承認をした企業・団体等を法人会員、また、その役職員又は構成員を個人会員と称する。なお、個人会員は、本規約を承認することにより、本会のサービスを利用することができるものとする。
                  </p>
                </li>
                <li class="p-personal-information-modal__lists2__item">
                  <span>2.</span>
                  <p class="p-personal-information-modal__text">
                    個人会員の会員資格の取得及び喪失は、第９条に定める場合を除き、法人会員が当社所定の月次の締切日までに当社に届け出ることにより行う。個人会員は、法人会員が当該個人会員の資格取得について届け出た月の翌月１日（ただし、当社所定の月次の締切日後に行われた届出については、翌々月１日とする）から、法人会員が当該個人会員の資格喪失について届け出た月の末日まで、本会のサービスを利用することができる。
                  </p>
                </li>
              </ul>
            </li>

            <li class="p-personal-information-modal__lists1__item">
              <h4 class="p-personal-information-modal__subTitle">
                第3条 会員サービスの種類・内容
              </h4>
              <ul class="p-personal-information-modal__lists2">
                <li class="p-personal-information-modal__lists2__item">
                  <p class="p-personal-information-modal__text">
                    個人会員は、法人会員が本会への入会に関して当社との間で締結する契約に応じて指定されるサービスの提供を受けることができる。本会の個々のサービスの内容、利用価格、利用方法等は、当社より個人会員に配布される配布物及びホームページ等で指定される。
                  </p>
                </li>
              </ul>
            </li>

            <li class="p-personal-information-modal__lists1__item">
              <h4 class="p-personal-information-modal__subTitle">
                第4条 会員サービスの対象者の範囲
              </h4>
              <ul class="p-personal-information-modal__lists2">
                <li class="p-personal-information-modal__lists2__item">
                  <span>1.</span>
                  <p class="p-personal-information-modal__text">
                    本会のサービスを受けることができる者は、原則として個人会員本人、その配偶者及び各々の二親等以内の親族（以下、「配偶者等」と総称する）とする。個人会員は、自己の責任において配偶者等に本会のサービスを利用させ、配偶者等をして本規約の内容を遵守させるものとする。
                  </p>
                </li>
                <li class="p-personal-information-modal__lists2__item">
                  <span>2.</span>
                  <p class="p-personal-information-modal__text">
                    前項に基づき、配偶者等に本会のサービスを利用させる場合、当該配偶者等による本会のサービスの利用は、個人会員本人による本会のサービスの利用とみなす。
                  </p>
                </li>
                <li class="p-personal-information-modal__lists2__item">
                  <span>3.</span>
                  <p class="p-personal-information-modal__text">
                    個人会員は、個人会員及び配偶者等以外の第三者に本会のサービスを利用せしめてはならない。
                  </p>
                </li>
              </ul>
            </li>

            <li class="p-personal-information-modal__lists1__item">
              <h4 class="p-personal-information-modal__subTitle">
                第5条 会員証の発行
              </h4>
              <ul class="p-personal-information-modal__lists2">
                <li class="p-personal-information-modal__lists2__item">
                  <p class="p-personal-information-modal__text">
                    当社は、個人会員に対し、原則として会員証（紙媒体、電子媒体等の形態を問わない。以下同じ）を発行し、個人会員は交付された会員証の提示をもって本会のサービスを利用できるものとする。
                  </p>
                </li>
              </ul>
            </li>

            <li class="p-personal-information-modal__lists1__item">
              <h4 class="p-personal-information-modal__subTitle">
                第6条 会員証の再発行
              </h4>
              <ul class="p-personal-information-modal__lists2">
                <li class="p-personal-information-modal__lists2__item">
                  <p class="p-personal-information-modal__text">
                    個人会員が紛失等により会員証の再発行を必要とするときは、個人会員は、所定の様式にて当社に届出を行うものとする。再発行の費用は個人会員の負担とする。
                  </p>
                </li>
              </ul>
            </li>

            <li class="p-personal-information-modal__lists1__item">
              <h4 class="p-personal-information-modal__subTitle">
                第7条 個人会員ＩＤ・パスワード
              </h4>
              <ul class="p-personal-information-modal__lists2">
                <li class="p-personal-information-modal__lists2__item">
                  <span>1.</span>
                  <p class="p-personal-information-modal__text">
                    個人会員は、会員証並びに個人会員ＩＤ及びパスワードを第三者に譲渡又は貸与してはならず、個人会員ID及びパスワードは、開示・漏洩等しないよう秘密として厳重に管理しなければならない。ただし、個人会員が第4条に基づき、配偶者等に本会のサービスを利用させるために会員証を貸与する場合はこの限りではない。
                  </p>
                </li>
                <li class="p-personal-information-modal__lists2__item">
                  <span>2.</span>
                  <p class="p-personal-information-modal__text">
                    個人会員ＩＤ及びパスワードが当社所定の方法により入力され、本会のサービスが利用された場合には、当社は、当該利用を当該個人会員による本会のサービス利用とみなすことができるものとする。ただし、当該利用が、当社の故意又は重大な過失による個人会員ＩＤ及びパスワードの漏洩等に基づくものであるときはこの限りではない。
                  </p>
                </li>
                <li class="p-personal-information-modal__lists2__item">
                  <span>3.</span>
                  <p class="p-personal-information-modal__text">
                    当社に故意又は重大な過失がない場合、当社は、会員証、個人会員ＩＤ又はパスワードを用いた第三者の本会のサービス利用等による個人会員の不利益及び損害について、一切の責任を負わない。
                  </p>
                </li>
              </ul>
            </li>

            <li class="p-personal-information-modal__lists1__item">
              <h4 class="p-personal-information-modal__subTitle">
                第8条 遵守事項
              </h4>
              <ul class="p-personal-information-modal__lists2">
                <li class="p-personal-information-modal__lists2__item">
                  <span>1.</span>
                  <div>
                    <p class="p-personal-information-modal__text">
                      個人会員は、次の事項を遵守しなければならない。
                    </p>
                    <ul class="p-personal-information-modal__lists3">
                      <li class="p-personal-information-modal__lists3__item">
                        <span>(1)</span>
                        <p class="p-personal-information-modal__text">
                          登録事項に変更が生じた場合、速やかに自己が属する法人会員を通じて当社に届出を行うものとする。
                        </p>
                      </li>
                      <li class="p-personal-information-modal__lists3__item">
                        <span>(2)</span>
                        <p class="p-personal-information-modal__text">
                          本会の提供するサービス（本会のサービスをその要素とするサービスを含む）を、直接的であると間接的であるとを問わず、第三者から収益を得る目的で使用してはならない。
                        </p>
                      </li>
                      <li class="p-personal-information-modal__lists3__item">
                        <span>(3)</span>
                        <p class="p-personal-information-modal__text">
                          料金を支払う規定のある本会のサービスについては、所定の料金を支払わなければならない。
                        </p>
                      </li>
                      <li class="p-personal-information-modal__lists3__item">
                        <span>(4)</span>
                        <p class="p-personal-information-modal__text">
                          本会のサービスの利用に際してはその施設等の利用規約に従うものとする。
                        </p>
                      </li>
                    </ul>
                  </div>
                </li>
                <li class="p-personal-information-modal__lists2__item">
                  <span>2.</span>
                  <p class="p-personal-information-modal__text">
                    個人会員は、本会のサービスの利用に際し、その施設等に対して故意又は過失により損害を与えたときは、その損害を賠償するものとする。
                  </p>
                </li>
              </ul>
            </li>

            <li class="p-personal-information-modal__lists1__item">
              <h4 class="p-personal-information-modal__subTitle">
                第9条 会員資格の喪失
              </h4>
              <ul class="p-personal-information-modal__lists2">
                <li class="p-personal-information-modal__lists2__item">
                  <span>1.</span>
                  <p class="p-personal-information-modal__text">
                    個人会員は、法人会員が退会、又はその他の事由により会員資格を喪失した場合には、法人会員の会員資格喪失日付けで、会員資格を喪失するものとする。
                  </p>
                </li>
                <li class="p-personal-information-modal__lists2__item">
                  <span>2.</span>
                  <div>
                    <p class="p-personal-information-modal__text">
                      当社は、次のいずれかの場合には、催告を行うことなく個人会員の会員資格を喪失させることができる。<br />この場合、個人会員は当社が個人会員の会員資格の喪失を通知した日付けで会員資格を喪失するものとする。
                    </p>
                    <ul class="p-personal-information-modal__lists3">
                      <li class="p-personal-information-modal__lists3__item">
                        <span>(1)</span>
                        <p class="p-personal-information-modal__text">
                          個人会員が本規約に定める事項又はその他の規約、特約等に違反したとき
                        </p>
                      </li>
                      <li class="p-personal-information-modal__lists3__item">
                        <span>(2)</span>
                        <p class="p-personal-information-modal__text">
                          個人会員が不適切なサービス利用その他の行為により本会の正常な運営を妨げ若しくは信用を傷つけ、又はそのおそれがあると当社が判断したとき
                        </p>
                      </li>
                      <li class="p-personal-information-modal__lists3__item">
                        <span>(3)</span>
                        <p class="p-personal-information-modal__text">
                          個人会員が不適切な目的（第8条第1項第2号に定める目的を含むが、これに限られない）で本会のサービスを利用し、又は利用しようとしたとき、その他個人会員の会員資格の継続を認めることが妥当ではないと当社が判断したとき
                        </p>
                      </li>
                      <li class="p-personal-information-modal__lists3__item">
                        <span>(4)</span>
                        <p class="p-personal-information-modal__text">
                          個人会員に反社会的勢力との関わりが生じたと当社が判断したとき
                        </p>
                      </li>
                      <li class="p-personal-information-modal__lists3__item">
                        <span>(5)</span>
                        <p class="p-personal-information-modal__text">
                          前各号に準ずる事由が生じたとき
                        </p>
                      </li>
                    </ul>
                  </div>
                </li>
                <li class="p-personal-information-modal__lists2__item">
                  <span>3.</span>
                  <p class="p-personal-information-modal__text">
                    前各項に基づいて個人会員が会員資格を喪失した場合は、法人会員と当社とが別途合意した場合を除き、当該個人会員は、会員資格を喪失した日以降、本会のサービス（会員資格喪失日の前に申込みを行ったサービスを含む）を一切受けることができないものとする。
                  </p>
                </li>
                <li class="p-personal-information-modal__lists2__item">
                  <span>4.</span>
                  <p class="p-personal-information-modal__text">
                    当社は、個人会員に対し、個人会員が会員資格を喪失し、本会のサービスを利用できないことをもって個人会員に生じた損害について一切の責任を負わない。
                  </p>
                </li>
              </ul>
            </li>

            <li class="p-personal-information-modal__lists1__item">
              <h4 class="p-personal-information-modal__subTitle">
                第10条 個人情報の取扱い
              </h4>
              <ul class="p-personal-information-modal__lists2">
                <li class="p-personal-information-modal__lists2__item">
                  <span>1.</span>
                  <p class="p-personal-information-modal__text">
                    当社は、会員登録に際して法人会員又は個人会員より届けられた「個人情報の保護に関する法律」（平成15年5月30日法律第57号）（以下「個人情報保護法」という）第２条第１項に定める個人情報（以下「個人情報」という）並びに本会のサービスを利用する際に個人会員又は他の利用者（配偶者等並びに個人会員及び配偶者等の同伴者をいう。以下同じ。また、個人会員とあわせて、以下「個人会員等」と総称する）より取得した個人情報を、当社が別に定める「個人情報保護方針」等に従い、適切に管理するものとする。なお、個人会員は、他の利用者に本会のサービスを利用させるにあたり、本条及び第12条の内容を承認させるものとする。
                  </p>
                </li>
                <li class="p-personal-information-modal__lists2__item">
                  <span>2.</span>
                  <div>
                    <p class="p-personal-information-modal__text">
                      当社は、個人会員等に係る個人情報を厳に秘密として管理し、本人の事前の承諾なく第三者に提供又は開示しないものとする。ただし、次の各場合には、本人の事前の同意なくして当社は、第三者に対して個人情報を提供又は開示できるものとする
                    </p>
                    <ul class="p-personal-information-modal__lists3">
                      <li class="p-personal-information-modal__lists3__item">
                        <span>(1)</span>
                        <p class="p-personal-information-modal__text">
                          法令に基づく場合
                        </p>
                      </li>
                      <li class="p-personal-information-modal__lists3__item">
                        <span>(2)</span>
                        <p class="p-personal-information-modal__text">
                          人の生命、身体又は財産の保護のために必要がある場合であって、本人の同意を得ることが困難であるとき
                        </p>
                      </li>
                      <li class="p-personal-information-modal__lists3__item">
                        <span>(3)</span>
                        <p class="p-personal-information-modal__text">
                          公衆の衛生の向上又は児童の健全な育成の推進のために特に必要がある場合であって、本人の同意を得ることが困難であるとき
                        </p>
                      </li>
                      <li class="p-personal-information-modal__lists3__item">
                        <span>(4)</span>
                        <p class="p-personal-information-modal__text">
                          国の機関若しくは地方公共団体又はその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき
                        </p>
                      </li>
                      <li class="p-personal-information-modal__lists3__item">
                        <span>(5)</span>
                        <p class="p-personal-information-modal__text">
                          個人情報保護法及びその他関係諸規則に違反しない方法で提供する場合
                        </p>
                      </li>
                      <li class="p-personal-information-modal__lists3__item">
                        <span>(6)</span>
                        <p class="p-personal-information-modal__text">
                          当社と業務提携を行っている宿泊施設等のサービス提供企業及び本会に係る事務等において当社と提携する企業（以下、サービス提供企業を含めて「提携事業者」と総称する）に対して、個人会員等が本会のサービスを利用するために必要な範囲内で提供する場合
                        </p>
                      </li>
                    </ul>
                  </div>
                </li>
                <li class="p-personal-information-modal__lists2__item">
                  <span>3.</span>
                  <div>
                    <p class="p-personal-information-modal__text">
                      当社は、個人情報を次の目的に限定して利用するものとする。
                    </p>
                    <ul class="p-personal-information-modal__lists3">
                      <li class="p-personal-information-modal__lists3__item">
                        <span>(1)</span>
                        <p class="p-personal-information-modal__text">
                          当社が法人会員及び個人会員等に本会のサービスを提供するため
                        </p>
                      </li>
                      <li class="p-personal-information-modal__lists3__item">
                        <span>(2)</span>
                        <p class="p-personal-information-modal__text">
                          個人会員に対する本会の会員証、配布物の発送及び当社のサービスの案内
                        </p>
                      </li>
                      <li class="p-personal-information-modal__lists3__item">
                        <span>(3)</span>
                        <p class="p-personal-information-modal__text">
                          会員情報の管理
                        </p>
                      </li>
                      <li class="p-personal-information-modal__lists3__item">
                        <span>(4)</span>
                        <p class="p-personal-information-modal__text">
                          その他本会のサービス提供に必要な業務
                        </p>
                      </li>
                    </ul>
                  </div>
                </li>
                <li class="p-personal-information-modal__lists2__item">
                  <span>4.</span>
                  <p class="p-personal-information-modal__text">
                    第2項の規定にかかわらず、当社は、前項の利用目的の達成に必要な範囲内において、個人情報の取扱いを第三者に対して業務委託する場合がある。
                  </p>
                </li>
                <li class="p-personal-information-modal__lists2__item">
                  <span>5.</span>
                  <p class="p-personal-information-modal__text">
                    第2項の規定にかかわらず、当社は、個人会員にかかる個人情報について、福利厚生サービスの委託元である法人会員と共有する場合がある。
                  </p>
                </li>
                <li class="p-personal-information-modal__lists2__item">
                  <span>6.</span>
                  <p class="p-personal-information-modal__text">
                    法人会員の退会、個人会員の退職等により個人会員が会員資格を失った場合、その個人情報については、当社は、原則として、提供するサービスの内容に応じて法人会員との契約又は協議により消去又は廃棄する。ただし、法令等諸規則に基づき当社が継続して保有する必要がある情報についてはこの限りではない。
                  </p>
                </li>
              </ul>
            </li>

            <li class="p-personal-information-modal__lists1__item">
              <h4 class="p-personal-information-modal__subTitle">
                第11条 サービス内容の変更及び本規約の改定
              </h4>
              <ul class="p-personal-information-modal__lists2">
                <li class="p-personal-information-modal__lists2__item">
                  <span>1.</span>
                  <p class="p-personal-information-modal__text">
                    当社は、提携事業者との提携条件の変更や提携解消等により、個人会員への事前の告知を行うことなく、サービス内容を変更（サービスの終了を含む）することができる。
                  </p>
                </li>
                <li class="p-personal-information-modal__lists2__item">
                  <span>2.</span>
                  <p class="p-personal-information-modal__text">
                    前項のサービス内容の変更を行う場合、個人会員に対して遅滞なくインターネット上の掲示、メール又はファックスによる通知のいずれかの方法で、これを告知又は周知するものとする。
                  </p>
                </li>
                <li class="p-personal-information-modal__lists2__item">
                  <span>3.</span>
                  <p class="p-personal-information-modal__text">
                    当社は、本会の健全な運営を図るため、又は法令の改正等により、当社が必要と判断した場合には、本規約を改定（変更及び廃止を含む）することができる。
                  </p>
                </li>
                <li class="p-personal-information-modal__lists2__item">
                  <span>4.</span>
                  <p class="p-personal-information-modal__text">
                    前項の改定を行う場合、本規約を改定する旨及び改定後の内容並びにその効力発生時期について、個人会員に対して事前にホームページにより告知又は周知するものとし、当該改定は、告知等に定める日より適用されるものとする。
                  </p>
                </li>
              </ul>
            </li>

            <li class="p-personal-information-modal__lists1__item">
              <h4 class="p-personal-information-modal__subTitle">
                第12条 免責
              </h4>
              <ul class="p-personal-information-modal__lists2">
                <li class="p-personal-information-modal__lists2__item">
                  <span>1.</span>
                  <div>
                    <p class="p-personal-information-modal__text">
                      当社は次の場合、何らの法的責任を負わない。ただし、当社は、（2）の場合には、可能な範囲で、個人会員と提携事業者との間の紛争の解決に努めるものとする。
                    </p>
                    <ul class="p-personal-information-modal__lists3">
                      <li class="p-personal-information-modal__lists3__item">
                        <span>(1)</span>
                        <p class="p-personal-information-modal__text">
                          不可抗力により、又はその他当社の故意若しくは重大な過失によらずに、サービス提供が中断又は停止した場合、個人会員が本会に送信したメッセージ若しくは情報が消失等した場合、及びその他サービスの利用に関して個人会員が損害を被った場合
                        </p>
                      </li>
                      <li class="p-personal-information-modal__lists3__item">
                        <span>(2)</span>
                        <p class="p-personal-information-modal__text">
                          個々のサービスの利用において個人会員と提携事業者との間で紛争が発生した場合
                        </p>
                      </li>
                    </ul>
                  </div>
                </li>
                <li class="p-personal-information-modal__lists2__item">
                  <span>2.</span>
                  <p class="p-personal-information-modal__text">
                    提携事業者が提供するサービス又は情報の利用の結果、個人会員又は他の利用者が損害又は傷害を被った場合には、当該個人会員又は他の利用者は、当該損害又は傷害が当社の故意又は重大な過失に基づく場合を除き、当社に対して何らの請求も行いえないものとする。
                  </p>
                </li>
              </ul>
            </li>

            <li class="p-personal-information-modal__lists1__item">
              <h4 class="p-personal-information-modal__subTitle">
                第13条 サービスの中断・停止等
              </h4>
              <ul class="p-personal-information-modal__lists2">
                <li class="p-personal-information-modal__lists2__item">
                  <div>
                    <p class="p-personal-information-modal__text">
                      当社は次の場合、個人会員への事前の通知を行うことなく、サービスの全部又は一部を中断又は停止等の必要な措置を採ることができるものとする。
                    </p>
                    <ul class="p-personal-information-modal__lists3">
                      <li class="p-personal-information-modal__lists3__item">
                        <span>(1)</span>
                        <p class="p-personal-information-modal__text">
                          本会のサービス用のハード、ソフト又は通信機器設備等に関わるメンテナンスや修理を定期的又は緊急に行う場合
                        </p>
                      </li>
                      <li class="p-personal-information-modal__lists3__item">
                        <span>(2)</span>
                        <p class="p-personal-information-modal__text">
                          アクセス過多等の予期せぬ要因でシステムに負荷が集中した場合
                        </p>
                      </li>
                      <li class="p-personal-information-modal__lists3__item">
                        <span>(3)</span>
                        <p class="p-personal-information-modal__text">
                          個人会員のセキュリティを確保する必要が生じた場合
                        </p>
                      </li>
                      <li class="p-personal-information-modal__lists3__item">
                        <span>(4)</span>
                        <p class="p-personal-information-modal__text">
                          火災、停電、その他不慮の事故等によりサービスの提供が困難な場合
                        </p>
                      </li>
                      <li class="p-personal-information-modal__lists3__item">
                        <span>(5)</span>
                        <p class="p-personal-information-modal__text">
                          前各号に準ずる事由が生じた場合
                        </p>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </li>

            <li class="p-personal-information-modal__lists1__item">
              <h4 class="p-personal-information-modal__subTitle">
                第14条 準拠法及び管轄裁判所
              </h4>
              <ul class="p-personal-information-modal__lists2">
                <li class="p-personal-information-modal__lists2__item">
                  <p class="p-personal-information-modal__text">
                    本規約に関する準拠法は、日本法とする。個人会員と当社との間で紛争が生じたときは、東京地方裁判所を第一審の専属的合意管轄裁判所とする。
                  </p>
                </li>
              </ul>
            </li>

            <li class="p-personal-information-modal__lists1__item">
              <h4 class="p-personal-information-modal__subTitle">
                第15条 言語
              </h4>
              <ul class="p-personal-information-modal__lists2">
                <li class="p-personal-information-modal__lists2__item">
                  <p class="p-personal-information-modal__text">
                    本規約は、日本語を正本として作成され、日本語の正本が、他の言語へのいかなる翻訳にもかかわらず、優越するものとする。
                  </p>
                </li>
              </ul>
            </li>

            <li class="p-personal-information-modal__lists1__item">
              <h4 class="p-personal-information-modal__subTitle">付　則</h4>
              <ul class="p-personal-information-modal__lists2">
                <li class="p-personal-information-modal__lists2__item">
                  <p class="p-personal-information-modal__text">
                    「CRMサービス」として本会のサービスを提供する場合の特約<br />企業・団体等が、本会のサービスを顧客満足度向上支援サービス（本付則において「CRMサービス」という）として、サービス利用料を自ら負担した上で、自らの取引先である顧客に対して提供する場合は、次の規定に従うものとする。
                  </p>
                </li>
                <li class="p-personal-information-modal__lists2__item">
                  <span>1.</span>
                  <p class="p-personal-information-modal__text">
                    本規約第１条中の「福利厚生サービス（健康管理サービス及び教育・研修サービス等を含む。以下同じ）」を「CRMサービス」、「その役職員又は構成員」を「その顧客」とそれぞれ読み替える。
                  </p>
                </li>
                <li class="p-personal-information-modal__lists2__item">
                  <span>2.</span>
                  <p class="p-personal-information-modal__text">
                    本規約第2条第1項を、次のとおり全面的に読み替える。<br />「1．本会の目的に賛同し本規約を承認の上、当社との間で業務提携契約等の契約（以下「基本契約」という）を締結した企業・団体等を法人会員、また、法人会員が本会のサービスを利用する者として指定した法人会員の顧客を個人会員と称する。<br />なお、個人会員は、本規約を承認することにより、本会のサービスを利用することができるものとする。」
                  </p>
                </li>
                <li class="p-personal-information-modal__lists2__item">
                  <span>3.</span>
                  <p class="p-personal-information-modal__text">
                    本規約第3条を、次のとおり全面的に読み替える。<br />「1．個人会員は、法人会員が当社との間で締結する基本契約に応じて指定されるサービスの提供を受けることができる。本会の個々のサービスの内容、利用価格、利用方法等は、当社より個人会員に提供される配布物及びホームページ等で指定される。<br />2．本会の呼称については、法人会員と当社との合意により、変更することができるものとする。」
                  </p>
                </li>
                <li class="p-personal-information-modal__lists2__item">
                  <span>4.</span>
                  <p class="p-personal-information-modal__text">
                    本規約第8条第1項第1号中の「自己が属する法人会員」を「自己に本会のサービスを提供する法人会員」と読み替える。
                  </p>
                </li>
                <li class="p-personal-information-modal__lists2__item">
                  <span>5.</span>
                  <p class="p-personal-information-modal__text">
                    本規約第9条第1項を、次のとおり全面的に読み替える。<br />
                    「1．個人会員は、法人会員と当社との間の基本契約が期間満了又は解除等により終了した場合は、法人会員と当社との間で特約がある場合を除き、当該基本契約の終了日付けで、会員資格を喪失するものとする。」
                  </p>
                </li>
                <li class="p-personal-information-modal__lists2__item">
                  <span>6.</span>
                  <p class="p-personal-information-modal__text">
                    本規約第10条第5項中の「福利厚生サービスの委託元である法人会員」を「CRMサービスの提供元である法人会員」と読み替える。
                  </p>
                </li>
                <li class="p-personal-information-modal__lists2__item">
                  <span>7.</span>
                  <p class="p-personal-information-modal__text">
                    本規約第10条第6項を、次のとおり全面的に読み替える。<br />「6．法人会員と当社との間の基本契約の終了、又は法人会員による第2条第2項に基づく個人会員の会員資格の資格喪失の届出等により個人会員が会員資格を失った場合、その個人情報については、当社は、原則として、提供するサービスの内容に応じて法人会員との契約又は協議により消去又は廃棄する。ただし、法令等諸規則に基づき当社が継続して保有する必要がある情報についてはこの限りではない。」
                  </p>
                </li>
              </ul>
            </li>
          </ul>
          <p class="p-personal-information-modal__revision-date">
            （2020年4月1日改定）
          </p>
        </div>

        <div class="p-personal-information-modal__mail-magazine">
          <h3 class="c-title2">メルマガ設定</h3>
          <p class="c-lead2">
            メールでおトクなメルマガを受け取りますか？
            <span class="c-lead2--red"
              >※
              お客さまはメール配信に同意いただいている状態です。配信が不要な方はチェックを外してください。</span
            >
          </p>
          <FormsCheckbox
            v-model="isSubscribe"
            class="c-lead2"
            name="check4"
            label="受け取る"
          />
          <p class="p-personal-information-modal__mail-magazine__label">
            個人情報のお取り扱いについて
          </p>
          <p class="p-personal-information-modal__mail-magazine__info">
            ご入力いただいた情報はメールマガジン配信システムの委託業務先であるチーターデジタル株式会社に委託します。業務委託先との間で、個人情報の保護を義務付ける契約を締結するとともに、委託した個人情報の取扱いについて、必要かつ適切な監督を行います。
          </p>
          <a
            href="https://bs.benefit-one.co.jp/BE-ONE/official/privacy.html"
            target="_blank"
            class="c-text-button2"
          >
            プライバシーポリシー
            <Icon name="action_link" :color="$colors.sub.blue" />
          </a>
        </div>

        <div class="c-buttons p-personal-information-modal__buttons">
          <div class="c-buttons4__inner c-buttons4__inner--spOrder1">
            <div class="c-buttonWrap4" @click="hide">
              <Button style-type="primary" color="color4"> 戻る </Button>
            </div>
          </div>
          <div class="c-buttons4__inner c-buttons4__inner--spOrder0">
            <div class="c-buttonWrap4" @click="login">
              <Button style-type="primary" color="color2">
                同意してログイン
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isSubscribe: true
    };
  },
  methods: {
    login() {
      this.$refs["personal-information-modal"].hide();
      this.$emit("submit", {isSubscribe: this.isSubscribe});
    },
    hide() {
      this.$refs["personal-information-modal"].hide();
      this.$emit('hide');
    },
    show() {
      this.$refs["personal-information-modal"].show();
    }
  },
  mounted() {
  }
};
</script>
<style lang="scss" scoped></style>
